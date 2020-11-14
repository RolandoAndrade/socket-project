"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesSocketRepository = void 0;
const net_1 = require("net");
const event_bus_1 = require("../../shared/event-bus/domain/event-bus");
const event_bus_messages_1 = require("../../shared/event-bus/domain/event-bus-messages");
const common_1 = require("@nestjs/common");
let MessagesSocketRepository = class MessagesSocketRepository {
    constructor(socket, eventBus) {
        this.socket = socket;
        this.eventBus = eventBus;
        this.socket.on("data", (data) => eventBus.publish(event_bus_messages_1.EventBusMessages.MESSAGE_RECEIVED, data.toString()));
    }
    async checksum(md5message) {
        await new Promise((resolve, reject) => {
            this.socket.write(`chkmsg ${md5message}`);
            resolve();
        });
    }
    async getMessage(udpPort) {
        await new Promise((resolve, reject) => {
            this.socket.write(`givememsg ${udpPort}`);
            resolve();
        });
    }
    async getMessageLength() {
        await new Promise((resolve, reject) => {
            this.socket.write(`msglen`);
            resolve();
        });
    }
    async sendBye() {
        await new Promise((resolve, reject) => {
            this.socket.write(`bye`);
            resolve();
        });
    }
    async sendHello(username) {
        await new Promise((resolve, reject) => {
            this.socket.write(`helloiam ${username}`);
            resolve();
        });
    }
};
MessagesSocketRepository = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [net_1.Socket,
        event_bus_1.EventBus])
], MessagesSocketRepository);
exports.MessagesSocketRepository = MessagesSocketRepository;
//# sourceMappingURL=messages.socket.repository.js.map