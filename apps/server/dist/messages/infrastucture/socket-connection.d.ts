/// <reference types="node" />
import { Socket } from "net";
export declare let socketInstance: Socket;
export declare function openConnection(port: number, host: string): Promise<Socket>;
