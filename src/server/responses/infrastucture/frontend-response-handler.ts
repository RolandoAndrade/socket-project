import {ResponseHandler} from "../domain/response-handler";

export class FrontendResponseHandler implements ResponseHandler{
    error(message: string) {
        alert("error");
    }

    success(message: string) {
        alert("success");
    }
}