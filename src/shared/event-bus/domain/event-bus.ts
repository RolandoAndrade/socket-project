import {Receiver} from "./receiver";

export interface EventBus {
    subscribe(topic: string, receiver: Receiver): void;
    unsubscribe(topic: string, receiver: Receiver): void;
    publish(topic: string, subject: string, tries?: number): Promise<void>;
}