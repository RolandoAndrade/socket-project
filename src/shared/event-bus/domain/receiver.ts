export interface Receiver {
    receive(topic: string, subject: string)
}