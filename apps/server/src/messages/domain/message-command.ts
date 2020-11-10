export interface MessageCommand{
    execute(payload?: string): Promise<void>;
}