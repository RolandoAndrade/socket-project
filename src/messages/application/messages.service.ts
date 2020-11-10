import { MessageRepository } from "../domain/message.repository";
import {Receiver} from "../../shared/event-bus/domain/receiver";
import {EventBusMessages} from "../../shared/event-bus/domain/event-bus-messages";
import {MessageResponse} from "../../responses/domain/response";
import {ResponseHandler} from "../../responses/domain/response-handler";

export class MessagesService implements Receiver{
    constructor(private readonly messagesRepository: MessageRepository,
                private readonly responseHandler: ResponseHandler) {}

    async sendHello(username: string) {
        console.info("Enviando saludo");
        await this.messagesRepository.sendHello(username);
    }

    receive(topic: string, subject: string) {
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
