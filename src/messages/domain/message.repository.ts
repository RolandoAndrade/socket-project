export interface MessageRepository {
    sendHello(username: string): Promise<void>;
    getMessageLength(): Promise<void>;
    getMessage(udpPort: number): Promise<void>;
    checksum(md5message: string): Promise<void>;
    sendBye(): Promise<void>;
}
