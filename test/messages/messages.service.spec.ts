import {MessagesService} from "../../src/messages/application/messages.service";
import {MessageRepository} from "../../src/messages/domain/message.repository";
import {MessagesSocketRepository} from "../../src/messages/infrastucture/messages.socket.repository";


jest.setTimeout(30000);
describe("messages service test", ()=>{
    let service: MessagesService;
    let repository: MessageRepository;

    beforeAll(async ()=>{
        repository = new MessagesSocketRepository();
        service = new MessagesService(repository);
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(true)
            }, 10000)
        })
    })

    it("send hello", async (done)=>{
        expect.assertions(1);
        service.sendHello("john");
    })
})