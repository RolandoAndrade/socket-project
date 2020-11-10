import { Module } from "@nestjs/common";
import {ServeStaticModule} from "@nestjs/serve-static";


@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: `public`
        })
    ],
    controllers: [],
    providers: []
})
export class AppModule {
    static port: number | string;
    constructor() {
        AppModule.port = 3000;
    }
}
