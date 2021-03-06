import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { EventBus } from "../shared/event-bus/domain/event-bus";
import { GenericEventBus } from "../shared/event-bus/infrastructure/generic-event-bus";
import { MessagesService } from "../messages/application/messages.service";
import { MessageRepository } from "../messages/domain/message.repository";
import { MessagesSocketRepository } from "../messages/infrastucture/messages.socket.repository";
import { openConnection, socketInstance } from "../messages/infrastucture/socket-connection";
import { Socket } from "net";
import { ConfigKeys } from "../shared/config.keys";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: `public`,
        }),
    ],
    controllers: [],
    providers: [
        MessagesService,
        {
            provide: EventBus,
            useClass: GenericEventBus,
        },
        {
            provide: MessageRepository,
            useClass: MessagesSocketRepository,
        },
        {
            provide: Socket,
            useFactory: async () => {
                await openConnection(ConfigKeys.PORT, ConfigKeys.HOST);
                return socketInstance;
            },
        },
    ],
})
export class AppModule {
    static port: number | string;
    constructor() {
        AppModule.port = 3000;
    }
}
