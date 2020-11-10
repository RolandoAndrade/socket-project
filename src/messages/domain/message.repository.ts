import {HelloResponse} from "../../responses/domain/hello-response";
import {LengthResponse} from "../../responses/domain/length-response";
import {MessageResponse} from "../../responses/domain/message-response";
import {ChecksumResponse} from "../../responses/domain/checksum-response";
import {ByeResponse} from "../../responses/domain/bye-response";

export interface MessageRepository{
    sendHello(username: string): Promise<HelloResponse>;
    getMessageLength(): LengthResponse;
    getMessage(udpPort: number): MessageResponse;
    checksum(md5message: string): ChecksumResponse;
    sendBye(): ByeResponse;
}