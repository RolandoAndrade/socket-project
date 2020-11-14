"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResponse = void 0;
class MessageResponse {
    constructor(data) {
        const index = data.indexOf(" ");
        this.status = data.substring(0, index);
        this.message = data.substring(index + 1);
    }
    isSuccess() {
        return this.status === 'ok';
    }
    getMessage() {
        return this.message;
    }
}
exports.MessageResponse = MessageResponse;
//# sourceMappingURL=response.js.map