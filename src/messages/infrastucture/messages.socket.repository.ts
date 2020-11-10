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
    private readonly socket: Socket;
    private isConnected: boolean = false;

    constructor() {

        this.socket = new Socket();
        this.socket.connect(PORT, '127.0.0.1', ()=>{
            console.log("Connected");
        });
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

    sendHello(username: string): HelloResponse {
        this.socket.emit("helloiam", username);
        console.log(this.socket)
        return {}
    }

}