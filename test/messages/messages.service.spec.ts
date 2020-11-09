import {MessagesService} from "../../src/messages/application/messages.service";
import {MessageRepository} from "../../src/messages/domain/message.repository";
import {MessagesSocketRepository} from "../../src/messages/infrastucture/messages.socket.repository";

describe("messages service test", ()=>{
    let service: MessagesService;
    let repository: MessageRepository;

    beforeEach(()=>{
        repository = new MessagesSocketRepository();
        service = new MessagesService(repository);
    })

    it("send hello", ()=>{
        const r = service.sendHello("john");
        console.log(r);
        expect(r).toBeDefined();
    })
})