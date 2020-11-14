import { EventBus } from "../domain/event-bus";
import { Receiver } from "../domain/receiver";
export declare class GenericEventBus implements EventBus {
    private receivers;
    private triesToSendToReceiver;
    publish(topic: string, subject: string, tries?: number): Promise<void>;
    subscribe(topic: string, receiver: Receiver): void;
    unsubscribe(topic: string, receiver: Receiver): void;
    private retryPublish;
}
