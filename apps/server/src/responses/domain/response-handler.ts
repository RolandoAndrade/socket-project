export interface ResponseHandler{
    success(message: string);
    error(message: string);
}