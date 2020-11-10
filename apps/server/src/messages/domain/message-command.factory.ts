import {MessageCommand} from "./message-command";

export abstract class MessageCommandFactory{
    abstract createCommand(command: string): MessageCommand;
}