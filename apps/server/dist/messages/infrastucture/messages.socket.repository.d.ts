/// <reference types="node" />
import { MessageRepository } from "../domain/message.repository";
import { Socket } from "net";
import { EventBus } from "../../shared/event-bus/domain/event-bus";
export declare class MessagesSocketRepository implements MessageRepository {
    private readonly socket;
    private readonly eventBus;
    constructor(socket: Socket, eventBus: EventBus);
    checksum(md5message: string): Promise<void>;
    getMessage(udpPort: number): Promise<void>;
    getMessageLength(): Promise<void>;
    sendBye(): Promise<void>;
    sendHello(username: string): Promise<void>;
}
