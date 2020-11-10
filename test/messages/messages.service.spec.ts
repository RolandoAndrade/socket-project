import {MessagesService} from "../../src/messages/application/messages.service";
import {MessageRepository} from "../../src/messages/domain/message.repository";
import {MessagesSocketRepository} from "../../src/messages/infrastucture/messages.socket.repository";
import {openConnection} from "../../src/messages/infrastucture/socket-connection";

jest.setTimeout(10000);
describe("messages service test", ()=>{
    let service: MessagesService;
    let repository: MessageRepository;

    beforeAll(async ()=>{
        const socket = await openConnection(19876, '127.0.0.1');
        repository = new MessagesSocketRepository(socket);
        service = new MessagesService(repository);
    })

    it("send hello", async (done)=>{
        await service.sendHello("usuario_1");
    })
})