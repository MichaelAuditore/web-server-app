"use strict";
import fp from "fastify-plugin";
import { PassThrough } from "node:stream";

const orders = {
    A1: { total: 3 },
    A2: { total: 7 },
    B1: { total: 101 },
};

const catToPrefix = {
    electronics: "A",
    confectionery: "B",
};

//Generate next ID
const calculateID = (idPrefix, data) => {
    const sorted = [...new Set(data.map(({ id }) => id))];
    const next = Number(sorted.pop().slice(1)) + 1;
    return `${idPrefix}${next}`;
};

//Plugins
export default fp(async function (fastify, opts) {
    fastify.decorate("currentOrders", currentOrders);
    fastify.decorate("realtimeOrders", realtimeOrdersSimulator);
    fastify.decorate("addOrder", addOrder);
    fastify.decorate("mockDataInsert", function (request, category, data) {
        const idPrefix = catToPrefix[category];
        const id = calculateID(idPrefix, data);
        orders[id] = { total: 0 };
        orderStream.write({ id, ...orders[id] })
        data.push({ id, ...request.body });
        return data
    });
});

// Crea un flujo de pedidos
const orderStream = new PassThrough({ objectMode: true });

// Simular pedidos en tiempo real
async function* realtimeOrdersSimulator() {
    for await (const { id, total } of orderStream)
        yield JSON.stringify({ id, total });
}

function* currentOrders(category) {
    const idPrefix = catToPrefix[category];
    if (!idPrefix) return;
    const ids = Object.keys(orders).filter((id) => id[0] === idPrefix);
    for (const id of ids)
        yield JSON.stringify({ id, ...orders[id] });
}

function addOrder(id, amount) {
    if (orders.hasOwnProperty(id) === false) {
        const error = new Error(`No se encontró la orden ${id}`);
        error.status = 404;
        throw error;
    }

    if (Number.isInteger(amount) === false) {
        const error = new Error("La cantidad suministrada debe ser un número entero");
        error.status = 400;
        throw error;
    }

    orders[id].total += amount;
    const { total } = orders[id];
    console.log("Agregando orden: %o", { id, total });
    orderStream.write({ id, total });
}