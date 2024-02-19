# Real-Time Process Monitoring (Server-Side)
This server-side application is designed to monitor real-time processes running on the system and provide updates to connected clients via WebSocket. The server detects the start and termination of processes, sending this information to clients in real-time without the need for polling.

## Features
- Real-Time Monitoring: The server continuously monitors running processes on the system.
- WebSocket Communication: Utilizes WebSocket for real-time communication with connected clients.
- Immediate Updates: Clients receive immediate updates when new processes start or existing processes terminate.
- Efficient Data Transfer: Minimizes data transfer by sending only new or terminated processes to clients.

## Getting Started
1. Installation:
   - Clone this repository to your local machine.
   - Install dependencies using npm install.
3. Running the Server:
   - Start the server using npm start.
   - The server will listen for WebSocket connections on port 3001 by default.
4. Connecting Clients:
   - Clients can connect to the server using WebSocket.
   - Example client implementation is provided in the frontend directory.

## Project Structure
- src/server.ts: Entry point for the server application.
- src/services/processService.ts: Service responsible for monitoring processes and sending updates to clients.
- utils/wmicUtils.ts: Utility functions for processing process data.
- interfaces/processInfo.ts: Interface defining the structure of process information.
- interfaces/processesUpdate.ts: Interface defining the structure of processes update.

## Technologies Used
- Node.js
- WebSocket
- Child Process Module
