<template>
    <v-container>
        <v-btn @click="() => sendHello()">HOLA</v-btn>
        <v-btn @click="() => giveMeMessage()">Mensaje</v-btn>
        <v-snackbar v-model="showMessage" :color="color" top right>{{ message }}</v-snackbar>
        <v-snackbar v-model="showQuote" color="purple" centered dark :timeout="10000">
            <v-col class="text-center">
                <div class="overline">El mensaje recibido es:</div>
                <div class="quote">
                    {{ quote }}
                </div>
            </v-col>
        </v-snackbar>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Commands } from "../../../../server/src/messages/domain/commands";
import io from "socket.io-client";
import Socket = SocketIOClient.Socket;
import { EventBusMessages } from "../../../../server/src/shared/event-bus/domain/event-bus-messages";
import { MessageResponse } from "@/modules/responses/domain/response";

@Component({
    name: "home",
})
export default class Home extends Vue {
    private socket!: Socket;

    private color: string = "";
    private showMessage: boolean = false;
    private message: string = "";

    quote: string = "";
    showQuote: boolean = false;

    showResponse(response: MessageResponse) {
        if (response.isAMessage()) {
            this.quote = response.getMessage();
            this.showQuote = true;
        } else {
            if (!response.isFailed()) {
                this.message = response.getStatus() + response.getMessage();
                if (response.isSuccess()) {
                    this.color = "blue";
                } else {
                    this.color = "error";
                }
            } else {
                this.color = "error";
                this.message = "Error: Server didn't response";
            }
            this.showMessage = true;
        }
    }

    created() {
        this.socket = io("ws://localhost:3000");
        this.socket.on(EventBusMessages.MESSAGE_RECEIVED, (data: string) => {
            this.showResponse(new MessageResponse(data));
        });
        this.socket.on("connect_error", () => {
            this.showResponse(new MessageResponse("error server is not active, check the vpn status"));
        });
        this.socket.on("connect", () => {
            this.showResponse(new MessageResponse("ok ready to start"));
        });
    }

    sendHello() {
        this.socket.emit(Commands.SEND_HELLO, "rjandrade.17");
    }

    giveMeMessage() {
        this.socket.emit(Commands.GET_MESSAGE, "51234");
    }
}
</script>

<style scoped>
.quote {
    font-style: italic;
    font-size: 12px;
}
</style>
