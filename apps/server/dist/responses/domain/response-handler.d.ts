export interface ResponseHandler {
    success(message: string): any;
    error(message: string): any;
}
