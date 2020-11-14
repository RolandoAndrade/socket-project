import { MessageRepository } from "../domain/message.repository";
import { Socket } from "net";
import { EventBus } from "../../shared/event-bus/domain/event-bus";
import { EventBusMessages } from "../../shared/event-bus/domain/event-bus-messages";
import {Injectable} from "@nestjs/common";

@Injectable()
export class MessagesSocketRepository implements MessageRepository {
    constructor(private readonly socket: Socket,
                private readonly eventBus: EventBus) {
        this.socket.on("data", (data) => eventBus.publish(EventBusMessages.MESSAGE_RECEIVED, data.toString()));
    }

    async checksum(md5message: string): Promise<void> {
        await new Promise((resolve, reject) => {
            this.socket.write(`chkmsg ${md5message}`);
            resolve();
        });
    }

    async getMessage(udpPort: number): Promise<void> {        
        await new Promise((resolve, reject) => {
            this.socket.write(`givememsg ${udpPort}`);
            resolve();
        })
    }

    async getMessageLength(): Promise<void> {
        await new Promise((resolve, reject) => {
            this.socket.write(`msglen`);
            resolve();
        });
    }

    async sendBye(): Promise<void> {
        await new Promise((resolve, reject) => {
            this.socket.write(`bye`);     
            resolve();
        });
    }

    async sendHello(username: string): Promise<void> {
        await new Promise((resolve, reject) => {
            this.socket.write(`helloiam ${username}`);
            resolve();
        });
    }
}
