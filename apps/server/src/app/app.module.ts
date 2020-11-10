import { Module } from "@nestjs/common";
import {ServeStaticModule} from "@nestjs/serve-static";
import {EventBus} from "../shared/event-bus/domain/event-bus";
import {GenericEventBus} from "../shared/event-bus/infrastructure/generic-event-bus";
import {MessagesService} from "../messages/application/messages.service";
import {MessageRepository} from "../messages/domain/message.repository";
import {MessagesSocketRepository} from "../messages/infrastucture/messages.socket.repository";
import {openConnection} from "../messages/infrastucture/socket-connection";
const HOST = "10.2.126.2";
const PORT = 19876;

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: `public`
        })
    ],
    controllers: [],
    providers: [
        MessagesService,
        {
            provide: EventBus,
            useClass: GenericEventBus
        },
        {
            provide: MessageRepository,
            useFactory: async (eventBus: EventBus)=>{
                const socket = await openConnection(PORT, HOST);
                return new MessagesSocketRepository(socket, eventBus);
            },
            inject: [EventBus]
        }
    ]
})
export class AppModule {
    static port: number | string;
    constructor() {
        AppModule.port = 3000;
    }
}