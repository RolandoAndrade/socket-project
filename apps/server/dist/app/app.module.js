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
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const event_bus_1 = require("../shared/event-bus/domain/event-bus");
const generic_event_bus_1 = require("../shared/event-bus/infrastructure/generic-event-bus");
const messages_service_1 = require("../messages/application/messages.service");
const message_repository_1 = require("../messages/domain/message.repository");
const messages_socket_repository_1 = require("../messages/infrastucture/messages.socket.repository");
const socket_connection_1 = require("../messages/infrastucture/socket-connection");
const net_1 = require("net");
const HOST = "10.2.126.2";
const PORT = 19876;
let AppModule = AppModule_1 = class AppModule {
    constructor() {
        AppModule_1.port = 3000;
    }
};
AppModule = AppModule_1 = __decorate([
    common_1.Module({
        imports: [],
        controllers: [],
        providers: [
            messages_service_1.MessagesService,
            {
                provide: event_bus_1.EventBus,
                useClass: generic_event_bus_1.GenericEventBus
            },
            {
                provide: message_repository_1.MessageRepository,
                useClass: messages_socket_repository_1.MessagesSocketRepository
            },
            {
                provide: net_1.Socket,
                useFactory: async () => socket_connection_1.openConnection(PORT, HOST)
            }
        ]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map