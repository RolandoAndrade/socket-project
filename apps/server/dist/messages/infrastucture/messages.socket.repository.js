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
const dgram_1 = require("dgram");
let MessagesSocketRepository = class MessagesSocketRepository {
    constructor(socket, eventBus) {
        this.socket = socket;
        this.eventBus = eventBus;
        this.md5Hex = require('md5-hex');
        this.socket.on("data", (data) => eventBus.publish(event_bus_messages_1.EventBusMessages.MESSAGE_RECEIVED, data.toString()));
        this.socket.on("error", (data) => eventBus.publish(event_bus_messages_1.EventBusMessages.MESSAGE_RECEIVED, data.toString()));
    }
    md5HexEncription(originalMessage) {
        return this.md5Hex(originalMessage);
    }
    async checksum(md5message) {
        let md5HexMessage = this.md5HexEncription(md5message);
        console.log(md5HexMessage);
        await new Promise((resolve, reject) => {
            this.socket.write(`chkmsg ${md5HexMessage}`);
            resolve();
        });
    }
    async createUDPClient() {
        this.udpClient = dgram_1.createSocket("udp4");
        await this.udpClient.on("message", (data) => {
            const buffer = Buffer.from(data.toString(), "base64");
            const decodedMessage = buffer.toString("utf8");
            this.eventBus.publish(event_bus_messages_1.EventBusMessages.MESSAGE_RECEIVED, `message received: ${decodedMessage}`);
            this.udpClient.close();
        });
    }
    async getMessage(udpPort) {
        await this.createUDPClient();
        await this.udpClient.bind(udpPort, async () => {
            await new Promise((resolve, reject) => {
                this.socket.write(`givememsg ${this.udpClient.address().port}`, (error) => {
                    if (error) {
                        this.eventBus.publish(event_bus_messages_1.EventBusMessages.MESSAGE_RECEIVED, error.message);
                    }
                });
                resolve();
            });
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
            this.socket.write(`helloiam ${username}`, (error) => {
                if (error) {
                    this.eventBus.publish(event_bus_messages_1.EventBusMessages.MESSAGE_RECEIVED, error.message);
                }
            });
            resolve();
        });
    }
};
MessagesSocketRepository = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [net_1.Socket, event_bus_1.EventBus])
], MessagesSocketRepository);
exports.MessagesSocketRepository = MessagesSocketRepository;
//# sourceMappingURL=messages.socket.repository.js.map