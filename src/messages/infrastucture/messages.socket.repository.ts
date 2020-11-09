import {MessageRepository} from "../domain/message.repository";
import {ChecksumResponse} from "../../responses/domain/checksum-response";
import {MessageResponse} from "../../responses/domain/message-response";
import {LengthResponse} from "../../responses/domain/length-response";
import {ByeResponse} from "../../responses/domain/bye-response";
import {HelloResponse} from "../../responses/domain/hello-response";
import * as socketIo from 'socket.io-client';
const SERVER_URL = 'http://10.2.126.2:19876';


export class MessagesSocketRepository implements MessageRepository{
    private readonly socket: SocketIOClient.Socket;

    constructor() {
        this.socket = socketIo(SERVER_URL);
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
        this.socket.on("res_code", (data)=>{
            console.log('entro', data);
        });
        return {}
    }

}