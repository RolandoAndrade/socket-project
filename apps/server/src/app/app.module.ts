import { Module } from "@nestjs/common";
import {ServeStaticModule} from "@nestjs/serve-static";
import {AppGateway} from "./gateway";


@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: `public`
        })
    ],
    controllers: [],
    providers: [AppGateway]
})
export class AppModule {
    static port: number | string;
    constructor() {
        AppModule.port = 3000;
    }
}
