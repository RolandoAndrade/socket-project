import { Socket } from "net";
import {Logger} from "@nestjs/common";

export let socketInstance: Socket = new Socket();

export async function openConnection(port: number, host: string): Promise<Socket> {
    const logger = new Logger("openConnection")
    logger.log(`Iniciando conexión con ${host}:${port}`);

    socketInstance.on("error", ()=>{
        logger.error(`Fallo al conectar con ${host}:${port}, revise su VPN`);
        logger.log(`Reintentando...`);
        socketInstance.connect(port, host, () => {
            logger.log(`Conectado con ${host}:${port}`);
        });
    })

    socketInstance.on("connect", ()=>{
        logger.log(`Conectado con ${host}:${port}`);
    })

    return new Promise((resolve, reject) => {
        socketInstance.connect(port, host, () => {
            return resolve(socketInstance);
        });
    });
}
