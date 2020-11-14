import { ResponseHandler } from "../domain/response-handler";
export declare class FrontendResponseHandler implements ResponseHandler {
    error(message: string): void;
    success(message: string): void;
}
