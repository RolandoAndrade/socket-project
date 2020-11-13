import { MessageRepository } from "../domain/message.repository";
import { Socket } from "net";
import { EventBus } from "../../shared/event-bus/domain/event-bus";
import { EventBusMessages } from "../../shared/event-bus/domain/event-bus-messages";
import { Injectable } from "@nestjs/common";
import {createSocket, Socket as DgramSocket} from "dgram";


@Injectable()
export class MessagesSocketRepository implements MessageRepository {
    private udpClient: DgramSocket;

    constructor(private readonly socket: Socket, private readonly eventBus: EventBus) {
        this.socket.on("data", (data) => eventBus.publish(EventBusMessages.MESSAGE_RECEIVED, data.toString()));
        this.udpClient = createSocket("udp4");
        this.udpClient.on("message", (data) => {
            const buffer = Buffer.from(data.toString(), 'base64');
            const decodedMessage = buffer.toString('ascii')
            this.eventBus.publish(EventBusMessages.MESSAGE_RECEIVED, `ok the decoded message is ${decodedMessage}`);
            this.udpClient.close();
        })
    }

    async checksum(md5message: string): Promise<void> {}

    async getMessage(udpPort: number): Promise<void> {
        this.udpClient.bind(udpPort, async ()=>{
            await new Promise((resolve, reject) => {
                this.socket.write(`givememsg ${this.udpClient.address().port}`, (error)=>{
                    if(error){
                        this.eventBus.publish(EventBusMessages.MESSAGE_RECEIVED, error.message)
                    }
                });
                resolve();
            })
        });
    }

    async getMessageLength(): Promise<void> {}

    async sendBye(): Promise<void> {}

    async sendHello(username: string): Promise<void> {
        await new Promise((resolve, reject) => {
            this.socket.write(`helloiam ${username}`, (error)=>{
                if(error){
                    this.eventBus.publish(EventBusMessages.MESSAGE_RECEIVED, error.message)
                }
            });
            resolve();
        });
    }
}
