export declare class MessageResponse {
    private readonly status;
    private readonly message;
    constructor(data: string);
    isSuccess(): boolean;
    getMessage(): string;
}
