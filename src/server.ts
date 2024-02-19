import { WebSocketServer } from "ws";
import { sendInitialProcessList, startProcessMonitoring } from "./services/processService";

const port = 3001;
const wss = new WebSocketServer({ port });

console.log(`listening at: ${port}`);

startProcessMonitoring(wss);

wss.on('connection', (ws) => {
    console.log('New client connected');
    sendInitialProcessList(ws);
});