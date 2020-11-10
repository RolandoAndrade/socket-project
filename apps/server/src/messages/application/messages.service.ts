import { MessageRepository } from "../domain/message.repository";
import {Receiver} from "../../shared/event-bus/domain/receiver";
import {EventBusMessages} from "../../shared/event-bus/domain/event-bus-messages";
import {MessageResponse} from "../../responses/domain/response";
import {ResponseHandler} from "../../responses/domain/response-handler";
import {Logger} from "@nestjs/common";

export class MessagesService implements Receiver{

    private readonly logger: Logger = new Logger("MessagesService")

    constructor(private readonly messagesRepository: MessageRepository,
                private readonly responseHandler: ResponseHandler) {}

    async sendHello(username: string) {
        this.logger.log("Enviando saludo")
        await this.messagesRepository.sendHello(username);
    }

    getMessageLength(){

    }

    getMessage(udpPort: string){
        const port = parseInt(udpPort);
    }

    checksum(message: string){

    }

    sendBye() {

    }

    receive(topic: string, subject: string) {
        this.logger.log("Se ha recibido una respuesta")
        if(topic === EventBusMessages.MESSAGE_RECEIVED){
            const response = new MessageResponse(subject);
            if(response.isSuccess()){
                this.responseHandler.success(response.getMessage());
            }
            else {
                this.responseHandler.error(response.getMessage());
            }
        }
    }
}
