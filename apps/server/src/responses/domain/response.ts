export class MessageResponse{
    private readonly status: string;
    private readonly message: string;

    constructor(data: string) {
        const index = data.indexOf(" ");
        this.status = data.substring(0, index);
        this.message = data.substring(index + 1);
    }

    public isSuccess(): boolean{
        return this.status === 'ok';
    }

    public getMessage(): string{
        return this.message;
    }
}