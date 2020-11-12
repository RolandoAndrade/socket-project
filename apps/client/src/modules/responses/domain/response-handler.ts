export interface ResponseHandler {
    success(message: string): void;
    error(message: string): void;
}
