import { Receiver } from "./receiver";
export declare abstract class EventBus {
    abstract subscribe(topic: string, receiver: Receiver): void;
    abstract unsubscribe(topic: string, receiver: Receiver): void;
    abstract publish(topic: string, subject: string, tries?: number): Promise<void>;
}
