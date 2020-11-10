import {MessageCommandFactory} from "../domain/message-command.factory";
import {Commands} from "../domain/commands";
import {MessagesService} from "../application/messages.service";
import {Injectable} from "@nestjs/common";
import {MessageCommand} from "../domain/message-command";
import {EventBus} from "../../shared/event-bus/domain/event-bus";
import {EventBusMessages} from "../../shared/event-bus/domain/event-bus-messages";

@Injectable()
export class MessageServiceCommandFactory implements MessageCommandFactory{
    constructor(private readonly messageService: MessagesService,
                private readonly eventBus: EventBus) {
    }

    createCommand(command: string): MessageCommand {
        const service = this.messageService;
        switch (command){
            case Commands.SEND_HELLO:
                return {
                    async execute(payload?: string) {
                        await service.sendHello(payload);
                    }
                };
            case Commands.GET_MESSAGE_LENGTH:
                return {
                    async execute(){
                        await service.getMessageLength();
                    }
                };
            case Commands.GET_MESSAGE:
                return {
                    async execute(payload?: string) {
                        await service.getMessage(payload);
                    }
                };
            case Commands.CHECKSUM:
                return {
                    async execute(payload?: string) {
                        await service.checksum(payload);
                    }
                };
            case Commands.SEND_BYE:
                return {
                    async execute() {
                        await service.sendBye();
                    }
                }
        }
        this.eventBus.publish(EventBusMessages.MESSAGE_RECEIVED, "error Comando incorrecto");
        return undefined;
    }
}