import { Socket } from "net";
import {Logger} from "@nestjs/common";

export async function openConnection(port: number, host: string): Promise<Socket> {
    const logger = new Logger("openConnection")
    logger.log(`Iniciando conexión con ${host}:${port}`);

    const socket = new Socket();

    socket.on("error", ()=>{
        logger.error(`Fallo al conectar con ${host}:${port}, revise su VPN`);
        logger.log(`Reintentando...`);
        socket.connect(port, host, () => {
            logger.log(`Conectado con ${host}:${port}`);
        });
    })

    return new Promise((resolve, reject) => {
        socket.connect(port, host, () => {
            logger.log(`Conectado con ${host}:${port}`);
            return resolve(socket);
        });
    });
}
