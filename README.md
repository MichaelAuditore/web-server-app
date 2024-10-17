# Static File Server

This is a copy from our [web-static-app](https://github.com/MichaelAuditore/static-web-app.git)

A Fastify-based static file server that serves files from a specified directory and supports real-time communication through WebSockets. This server is ideal for applications that require both static asset delivery and dynamic real-time interactions.

## Features

- Serves static files (HTML, CSS, JavaScript, etc.) from a specified directory.
- Implements WebSocket support for real-time communication.
- Lightweight and efficient, built on Fastify.
- Customizable server configuration.

## Requirements

- Node.js (>= 20.x)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MichaelAuditore/web-server-app.git
   cd web-server-app
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run App:
   ```
   npm run static
   ```

## Usage
   server is a directory which contains an application developed with fastify.js

   The api contains some routes to retrieves some information to our static application


   from server directory execute this command
   
   ```
   npm run start
   ```

   if your desire is to watch for changes you can run
   ```
   npm run dev
   ```
