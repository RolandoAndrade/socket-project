"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericEventBus = void 0;
class GenericEventBus {
    constructor() {
        this.receivers = {};
        this.triesToSendToReceiver = 3;
    }
    async publish(topic, subject, tries = 0) {
        if (tries === 0) {
            tries = this.triesToSendToReceiver;
        }
        const receivers = this.receivers[topic] || [];
        receivers.map((receiver) => new Promise((resolve) => resolve(this.retryPublish(topic, subject, receiver, tries))));
    }
    subscribe(topic, receiver) {
        if (!this.receivers[topic]) {
            this.receivers[topic] = [];
        }
        this.receivers[topic].push(receiver);
    }
    unsubscribe(topic, receiver) {
        if (!this.receivers[topic]) {
            return;
        }
        this.receivers[topic] = this.receivers[topic].filter((item) => item !== receiver);
    }
    retryPublish(topic, subject, receiver, triesLeft) {
        try {
            receiver.receive(topic, subject);
        }
        catch (e) {
            console.log("Hubo un error recibiendo el mensaje");
            console.log(JSON.stringify(e.message));
            triesLeft -= 1;
            if (triesLeft > 0) {
                this.retryPublish(topic, subject, receiver, triesLeft);
            }
        }
    }
}
exports.GenericEventBus = GenericEventBus;
//# sourceMappingURL=generic-event-bus.js.map