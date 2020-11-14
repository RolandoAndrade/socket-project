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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const message_repository_1 = require("../domain/message.repository");
const event_bus_messages_1 = require("../../shared/event-bus/domain/event-bus-messages");
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const commands_1 = require("../domain/commands");
let MessagesService = class MessagesService {
    constructor(messagesRepository) {
        this.messagesRepository = messagesRepository;
        this.logger = new common_1.Logger("MessagesService");
    }
    async sendHello(client, username) {
        this.logger.log("Enviando saludo...");
        await this.messagesRepository.sendHello(username);
    }
    async getMessageLength() {
        this.logger.log("Consiguiendo tamaño del mensaje para el usuario..");
        await this.messagesRepository.getMessageLength();
    }
    async getMessage(client, udpPort) {
        this.logger.log("Solicitando mensaje a un puerto UDP del cliente..");
        const port = parseInt(udpPort);
        await this.messagesRepository.getMessage(port);
    }
    async checksum(client, message) {
        this.logger.log("Enviando comando para validar el contenido del mensaje...");
        await this.messagesRepository.getMessageLength();
    }
    async sendBye() {
        this.logger.log("Finalizando coneccion...");
        await this.messagesRepository.getMessageLength();
    }
    receive(topic, subject) {
        this.logger.log("Se ha recibido una respuesta");
        if (topic === event_bus_messages_1.EventBusMessages.MESSAGE_RECEIVED) {
            this.server.write(subject);
        }
    }
    afterInit(server) {
        this.logger.log('Iniciado');
    }
    handleDisconnect(client) {
        this.logger.log(`Cliente desconectado: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Cliente conectado: ${client.id}`);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], MessagesService.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage(commands_1.Commands.SEND_HELLO),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, String]),
    __metadata("design:returntype", Promise)
], MessagesService.prototype, "sendHello", null);
__decorate([
    websockets_1.SubscribeMessage(commands_1.Commands.GET_MESSAGE_LENGTH),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessagesService.prototype, "getMessageLength", null);
__decorate([
    websockets_1.SubscribeMessage(commands_1.Commands.GET_MESSAGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object, String]),
    __metadata("design:returntype", Promise)
], MessagesService.prototype, "getMessage", null);
__decorate([
    websockets_1.SubscribeMessage(commands_1.Commands.CHECKSUM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object, String]),
    __metadata("design:returntype", Promise)
], MessagesService.prototype, "checksum", null);
__decorate([
    websockets_1.SubscribeMessage(commands_1.Commands.SEND_BYE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessagesService.prototype, "sendBye", null);
MessagesService = __decorate([
    websockets_1.WebSocketGateway(),
    common_1.Injectable(),
    __metadata("design:paramtypes", [message_repository_1.MessageRepository])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map