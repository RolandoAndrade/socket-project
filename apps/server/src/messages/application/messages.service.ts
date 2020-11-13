import { MessageRepository } from "../domain/message.repository";
import { Receiver } from "../../shared/event-bus/domain/receiver";
import { EventBusMessages } from "../../shared/event-bus/domain/event-bus-messages";
import { Injectable, Logger } from "@nestjs/common";
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Commands } from "../domain/commands";
import { EventBus } from "../../shared/event-bus/domain/event-bus";

@WebSocketGateway()
@Injectable()
export class MessagesService implements Receiver, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private readonly logger: Logger = new Logger("MessagesService");

    constructor(private readonly messagesRepository: MessageRepository, private readonly eventBus: EventBus) {
        this.eventBus.subscribe(EventBusMessages.MESSAGE_RECEIVED, this);
    }

    @SubscribeMessage(Commands.SEND_HELLO)
    async sendHello(client: Socket, username: string) {
        this.logger.log("Enviando saludo");
        await this.messagesRepository.sendHello(username);
    }

    @SubscribeMessage(Commands.GET_MESSAGE_LENGTH)
    getMessageLength() {}

    @SubscribeMessage(Commands.GET_MESSAGE)
    async getMessage(client: Socket, udpPort: string) {
        this.logger.log("Obteniendo mensaje");
        const port = parseInt(udpPort);
        await this.messagesRepository.getMessage(port);
    }

    @SubscribeMessage(Commands.CHECKSUM)
    checksum(client: Socket, message: string) {}

    @SubscribeMessage(Commands.SEND_BYE)
    sendBye() {}

    receive(topic: string, subject: string) {
        this.logger.log(`Se ha recibido una respuesta`);
        this.logger.debug(subject);
        if (topic === EventBusMessages.MESSAGE_RECEIVED) {
            this.server.emit(topic, subject);
        }
    }

    afterInit(server: Server) {
        this.logger.log("Iniciado");
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Cliente desconectado: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Cliente conectado: ${client.id}`);
    }
}
