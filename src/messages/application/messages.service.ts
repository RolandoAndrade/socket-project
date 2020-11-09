import {MessageRepository} from "../domain/message.repository";
import {HelloResponse} from "../../responses/domain/hello-response";

export class MessagesService{
    constructor(private readonly messagesRepository: MessageRepository) {
    }

    sendHello(username: string): HelloResponse{
        console.log("Enviando saludo");
        return this.messagesRepository.sendHello(username);
    }
}