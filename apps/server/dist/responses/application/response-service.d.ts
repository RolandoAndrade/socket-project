import { Receiver } from "../../shared/event-bus/domain/receiver";
export declare class ResponseService implements Receiver {
    receive(topic: string, subject: string): void;
}
