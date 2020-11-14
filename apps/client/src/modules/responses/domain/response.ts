import { capitalize } from "@/modules/shared/functions/string.functions";

export class MessageResponse {
    private readonly status: string;
    private readonly message: string;

    constructor(data: string) {
        if (data && data.includes("message received:")) {
            this.status = "message received";
            this.message = data.substring(18);
        } else {
            const index = data.indexOf(" ");
            if (index > 0) {
                this.status = data.substring(0, index);
                this.message = data.substring(index + 1);
            } else {
                this.status = data;
                this.message = "";
            }
        }
    }

    public isFailed(): boolean {
        return !this.status.includes("ok") && !this.status.includes("error");
    }

    public isSuccess(): boolean {
        return this.status.includes("ok");
    }

    public isAMessage(): boolean {
        return this.status.includes("message received");
    }

    public getStatus(): string {
        return capitalize(this.status) + (this.message.length ? ": " : "");
    }

    public getMessage(): string {
        return capitalize(this.message);
    }
}
