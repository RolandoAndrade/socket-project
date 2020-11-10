export abstract class MessageRepository {
    abstract sendHello(username: string): Promise<void>;
    abstract getMessageLength(): Promise<void>;
    abstract getMessage(udpPort: number): Promise<void>;
    abstract checksum(md5message: string): Promise<void>;
    abstract sendBye(): Promise<void>;
}
