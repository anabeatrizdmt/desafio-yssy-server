import { ProcessInfo } from "./processInfo";

export interface ProcessesUpdate {
    newProcesses: ProcessInfo[];
    terminatedProcesses: ProcessInfo[];
} 