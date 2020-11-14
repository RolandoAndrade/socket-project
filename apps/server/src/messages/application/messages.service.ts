import { MessageRepository } from "../domain/message.repository";
import {Receiver} from "../../shared/event-bus/domain/receiver";
import {EventBusMessages} from "../../shared/event-bus/domain/event-bus-messages";
import {Injectable, Logger} from "@nestjs/common";
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit, SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {Commands} from "../domain/commands";

@WebSocketGateway()
@Injectable()
export class MessagesService implements Receiver, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    private readonly logger: Logger = new Logger("MessagesService")

    constructor(private readonly messagesRepository: MessageRepository) {}


    @SubscribeMessage(Commands.SEND_HELLO)
    async sendHello(client: Socket, username: string) {
        this.logger.log("Enviando saludo...")        
        await this.messagesRepository.sendHello(username);
    }

    @SubscribeMessage(Commands.GET_MESSAGE_LENGTH)
    async getMessageLength(){
        this.logger.log("Consiguiendo tamaño del mensaje para el usuario..")
        await this.messagesRepository.getMessageLength();
    }

    @SubscribeMessage(Commands.GET_MESSAGE)
    async getMessage(client: Socket, udpPort: string){
        this.logger.log("Solicitando mensaje a un puerto UDP del cliente..")
        const port = parseInt(udpPort);
        await this.messagesRepository.getMessage(port);
    }

    @SubscribeMessage(Commands.CHECKSUM)
    async checksum(client: Socket, message: string){
        this.logger.log("Enviando comando para validar el contenido del mensaje...")
        await this.messagesRepository.getMessageLength();
    }

    @SubscribeMessage(Commands.SEND_BYE)
    async sendBye() {
        this.logger.log("Finalizando coneccion...")
        await this.messagesRepository.getMessageLength();
    }

    receive(topic: string, subject: string) {
        this.logger.log("Se ha recibido una respuesta")
        if(topic === EventBusMessages.MESSAGE_RECEIVED){
            this.server.write(subject);
        }
    }

    afterInit(server: Server) {
        this.logger.log('Iniciado');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Cliente desconectado: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Cliente conectado: ${client.id}`);
    }
}
