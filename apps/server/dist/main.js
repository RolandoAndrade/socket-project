"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_service_1 = require("./messages/application/messages.service");
const messages_socket_repository_1 = require("./messages/infrastucture/messages.socket.repository");
const socket_connection_1 = require("./messages/infrastucture/socket-connection");
const generic_event_bus_1 = require("./shared/event-bus/infrastructure/generic-event-bus");
const frontend_response_handler_1 = require("./responses/infrastucture/frontend-response-handler");
const event_bus_messages_1 = require("./shared/event-bus/domain/event-bus-messages");
const HOST = "10.2.126.2";
const PORT = 19876;
let messageService;
let repository;
let eventBus;
let socket;
async function setUp() {
    socket = await socket_connection_1.openConnection(PORT, HOST);
    eventBus = new generic_event_bus_1.GenericEventBus();
    console.log(socket);
    repository = new messages_socket_repository_1.MessagesSocketRepository(socket, eventBus);
    const responseHandler = new frontend_response_handler_1.FrontendResponseHandler();
    messageService = new messages_service_1.MessagesService(repository);
    eventBus.subscribe(event_bus_messages_1.EventBusMessages.MESSAGE_RECEIVED, messageService);
    await messageService.sendHello(socket, "aasucasas.17");
}
setUp();
//# sourceMappingURL=main.js.map