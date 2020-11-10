import { MessagesService } from "../../src/server/messages/application/messages.service";
import { MessageRepository } from "../../src/server/messages/domain/message.repository";
import { MessagesSocketRepository } from "../../src/server/messages/infrastucture/messages.socket.repository";
import { openConnection } from "../../src/server/messages/infrastucture/socket-connection";
import { EventBus } from "../../src/server/shared/event-bus/domain/event-bus";
import { GenericEventBus } from "../../src/server/shared/event-bus/infrastructure/generic-event-bus";
import { Socket } from "net";

jest.setTimeout(10000);
describe("messages service test", () => {
    let service: MessagesService;
    let repository: MessageRepository;
    let eventBus: EventBus;
    let socket: Socket;

    beforeAll(async () => {
        socket = await openConnection(19876, "127.0.0.1");
        eventBus = new GenericEventBus();
        eventBus.publish = jest.fn();
        repository = new MessagesSocketRepository(socket, eventBus);
        service = new MessagesService(repository, undefined);
    });

    it("send hello", async () => {
        await service.sendHello("usuario_1");
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
        expect(eventBus.publish).toHaveBeenCalled();
    });

    afterAll(async () => {
        socket.end();
    });
});
