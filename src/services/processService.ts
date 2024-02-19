import { WebSocketServer, WebSocket } from "ws";
import { ProcessInfo } from "../interfaces/processInfo";
import { exec } from "child_process";
import { convertWmicDateToISO } from "../utils/wmicUtils";
import { error } from "console";
import { ProcessesUpdate } from "../interfaces/processesUpdate";


const ms_interval = 5000;

let previousProcessList: ProcessInfo[] = [];

export function getProcessList(callback: (error: Error | null, processList: ProcessInfo[]) => void) {
    exec('wmic process get Caption,CreationDate,ProcessId', (error, stdout) => {
        if (error || !stdout) {
            callback(error, []);
            return;
        }

        let processList: ProcessInfo[] = [];
        const lines = stdout.split('\r\n');
        const body = lines.slice(1);
        const processes = body.filter(line => line.trim() !== '')

        for (let line of processes) {
            const parts = line.trim().split(/\s{2,}/);
            if (parts.length === 3) {
                const processName = parts[0] || '';
                const creationDate = parts[1] ? convertWmicDateToISO(parts[1]) : '';
                const processId = parts[2] || '';
                processList.push({ processId, processName, creationDate });
            }
        }
        callback(null, processList);
    })
};

export function sendInitialProcessList(ws: WebSocket) {
    getProcessList((error, processList) => {
        if (error) {
            console.error('error getting initial process list:', error);
            return;
        }
        ws.send(JSON.stringify({ type: 'initialProcessList', processes: processList }));
    });
}

export function sendProcessUpdate(wss: WebSocketServer, processInfo: ProcessesUpdate) {
    console.log('sending process update:', processInfo);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(processInfo));
        }
    })
}

export function startProcessMonitoring (wws: WebSocketServer) {
    setInterval(() => {
        getProcessList((error, processList) => {
            if (error || !processList) {
                console.error('error getting process list:', error);
                return;
            }

            const newProcesses = processList.filter((process) => {
                return !previousProcessList.some(previousProcess => previousProcess.processId === process.processId);
            });

            const terminatedProcesses = previousProcessList.filter((previousProcess) => {
                return !processList.some(process => process.processId === previousProcess.processId);
            });

            previousProcessList = processList;

            if (newProcesses.length > 0 || terminatedProcesses.length > 0) {
                const processUpdate =
                {
                    newProcesses,
                    terminatedProcesses
                };
                sendProcessUpdate(wws, processUpdate);
            }
        })
    }, ms_interval);
}