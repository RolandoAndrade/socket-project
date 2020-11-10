/*import {MessagesService} from "./messages/application/messages.service";
import {MessagesSocketRepository} from "./messages/infrastucture/messages.socket.repository";
import {openConnection} from "./messages/infrastucture/socket-connection";
import {GenericEventBus} from "./shared/event-bus/infrastructure/generic-event-bus";
import {FrontendResponseHandler} from "./responses/infrastucture/frontend-response-handler";
import {EventBusMessages} from "./shared/event-bus/domain/event-bus-messages";
import {MessageRepository} from "./messages/domain/message.repository";
import {EventBus} from "./shared/event-bus/domain/event-bus";
import {Socket} from "net";

const HOST = "10.2.126.2";
const PORT = 19876;
let messageService: MessagesService;
let repository: MessageRepository;
let eventBus: EventBus;
let socket: Socket;

async function setUp(){
    socket = await openConnection(PORT, HOST);
    eventBus = new GenericEventBus();
    repository = new MessagesSocketRepository(socket, eventBus);
    const responseHandler = new FrontendResponseHandler();
    messageService = new MessagesService(repository, responseHandler);
    eventBus.subscribe(EventBusMessages.MESSAGE_RECEIVED, messageService);
    await messageService.sendHello("usuario_1");
}

setUp();

*/

import * as path from "path";

const app = require('express')();
const http = require('http').createServer(app);
const express = require('express');
const io = require('socket.io')(http);

app.use('/public',express.static(path.resolve(__dirname + '/../../public')));
app.use('/src/client',express.static(path.resolve(__dirname + '/../../src/client')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../public/index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
