import {Socket} from "net";

export async function openConnection(port: number, host: string): Promise<Socket> {
    const socket = new Socket();

    return new Promise((resolve, reject) => {
        socket.connect(port, host, ()=>{
            console.log("Connected");
            return resolve(socket);
        });
    });
}