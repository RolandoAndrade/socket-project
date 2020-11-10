import {EventBus} from "../domain/event-bus";
import {Receiver} from "../domain/receiver";

export class GenericEventBus implements EventBus{
    private receivers: {
        [subject: string]: Receiver[],
    } = {};

    private triesToSendToReceiver: number = 3;

    async publish(topic: string, subject: string, tries = 0): Promise<void> {
        if (tries === 0) {
            tries = this.triesToSendToReceiver;
        }

        const receivers = this.receivers[topic] || [];

        receivers.map(
            receiver => new Promise(resolve => resolve(this.retryPublish(topic, subject, receiver, tries))),
        );
    }

    subscribe(topic: string, receiver: Receiver): void {
        if (!this.receivers[topic]) {
            this.receivers[topic] = []
        }
        this.receivers[topic].push(receiver);
    }

    unsubscribe(topic: string, receiver: Receiver): void {
        if (!this.receivers[topic]) {
            return;
        }
        this.receivers[topic] = this.receivers[topic].filter(item => item !== receiver);
    }

    private retryPublish(topic: string, subject: string, receiver: Receiver, triesLeft: number) {
        try {
            receiver.receive(topic, subject);
        } catch (e) {
            console.log('Hubo un error recibiendo el mensaje');
            triesLeft -= 1;
            if (triesLeft > 0) {
                this.retryPublish(topic, subject, receiver, triesLeft);
            }
        }
    }
}