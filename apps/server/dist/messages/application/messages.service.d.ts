import { MessageRepository } from "../domain/message.repository";
import { Receiver } from "../../shared/event-bus/domain/receiver";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { EventBus } from "../../shared/event-bus/domain/event-bus";
export declare class MessagesService implements Receiver, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagesRepository;
    private readonly eventBus;
    server: Server;
    private readonly logger;
    constructor(messagesRepository: MessageRepository, eventBus: EventBus);
    sendHello(client: Socket, username: string): Promise<void>;
    getMessageLength(): Promise<void>;
    getMessage(client: Socket, udpPort: string): Promise<void>;
    checksum(client: Socket, message: string): Promise<void>;
    sendBye(): Promise<void>;
    receive(topic: string, subject: string): void;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
