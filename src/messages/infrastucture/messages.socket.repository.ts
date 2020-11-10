import {MessageRepository} from "../domain/message.repository";
import {ChecksumResponse} from "../../responses/domain/checksum-response";
import {MessageResponse} from "../../responses/domain/message-response";
import {LengthResponse} from "../../responses/domain/length-response";
import {ByeResponse} from "../../responses/domain/bye-response";
import {HelloResponse} from "../../responses/domain/hello-response";
import {Socket} from "net";

const HOST = '10.2.126.2'
const PORT = 19876;


export class MessagesSocketRepository implements MessageRepository{


    constructor(private readonly socket: Socket) {
        this.socket.on("data", (data)=>{
            console.log("Epa: ", data.toString())
        })
    }

    checksum(md5message: string): ChecksumResponse {
        return undefined;
    }

    getMessage(udpPort: number): MessageResponse {
        return undefined;
    }

    getMessageLength(): LengthResponse {
        return undefined;
    }

    sendBye(): ByeResponse {
        return undefined;
    }

    async sendHello(username: string): Promise<HelloResponse> {
        return new Promise((resolve, reject)=>{
            this.socket.write(`helloiam ${username}`, (res)=>{
                resolve({})
            });
        });
    }

}