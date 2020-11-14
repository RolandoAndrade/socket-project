<template>
    <v-container>
          <v-col>
            <div class="overline text-center font-weight-light">ACTIONS</div>
            <v-card class="pa-8 mx-auto" outlined width="800">
              <v-row align="center" dense>
                <v-col cols="8">
                  <v-text-field label="Username" outlined v-model="username" :disabled="isSigned"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field label="UDP port" outlined v-model="udpPort" :disabled="!isSigned" type="number" min="1025"></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  <v-btn  block class="mr-2 white--text" outlined color="green" @click="()=>sendHello()" :disabled="isSigned">HELLO!</v-btn>
                </v-col>
                <v-col>
                  <v-btn  block class="mr-2 white--text" outlined color="orange" :disabled="!isSigned">GET LENGTH</v-btn>
                </v-col>
                <v-col>
                  <v-btn  block class="mr-2 white--text" outlined color="purple" :disabled="!isSigned" @click="()=>giveMeMessage()">GET MESSAGE</v-btn>
                </v-col>
                <v-col>
                  <v-btn  block class="mr-2 white--text" outlined color="cyan" :disabled="!isSigned || !quote">CHECKSUM</v-btn>
                </v-col>
                <v-col>
                  <v-btn  block class="mr-2 white--text" outlined color="red" :disabled="!isSigned">BYE</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

        <div class="overline text-center font-weight-light mt-6">RECEIVED RESPONSES</div>

        <v-sheet color="transparent" class="mx-auto"  width="800">
          <div v-for="(msg, k) in messages" :key="k">
            <v-card shaped dark class="blue pa-4 my-2" v-if="msg.isSuccess()">{{msg.getMessage() || msg.getStatus()}}</v-card>
            <v-card shaped dark class="purple pa-4 my-2" v-else-if="msg.isAMessage()">{{msg.getMessage() || msg.getStatus()}}</v-card>
            <v-card shaped dark class="error pa-4 my-2" v-else>{{msg.getMessage() || msg.getStatus()}}</v-card>

          </div>
        </v-sheet>
        <v-overlay v-model="showQuote">
          <v-snackbar v-model="showQuote" color="purple" centered dark :timeout="10000">
            <v-col class="text-center">
              <div class="overline">Your message is:</div>
              <div class="quote">
                {{ quote }}
              </div>
            </v-col>
          </v-snackbar>
        </v-overlay>
        <v-snackbar v-model="showMessage" :color="color" top right>{{ message }}</v-snackbar>


    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Commands} from "../../../../server/src/messages/domain/commands";
import io from "socket.io-client";
import {EventBusMessages} from "../../../../server/src/shared/event-bus/domain/event-bus-messages";
import {MessageResponse} from "@/modules/responses/domain/response";
import {ResponseState} from "@/modules/responses/domain/response-state";
import Socket = SocketIOClient.Socket;

@Component({
    name: "home",
})
export default class Home extends Vue {
    private socket!: Socket;

    private waitingState: ResponseState = ResponseState.WAITING_FOR_LOGIN;

    private color: string = "";
    private showMessage: boolean = false;
    private message: string = "";

    quote: string | null = null;
    showQuote: boolean = false;

    messages: MessageResponse[] = []

    username: string | null = null;

    udpPort: number  = 51234;

    isSigned: boolean = false;

    showResponse(response: MessageResponse) {
        this.messages = [response, ...this.messages]
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
            const response = new MessageResponse(data);
            this.showResponse(response);
            if(response.isSuccess() && this.waitingState === ResponseState.WAITING_FOR_LOGIN){
              this.waitingState = ResponseState.READY;
              this.isSigned = true;
            }
            else if(response.isSuccess() && this.waitingState === ResponseState.WAITING_FOR_LOGOUT){
              this.isSigned = false;
              this.quote = null;
              this.waitingState = ResponseState.READY;
            }
        });
        this.socket.on("connect_error", () => {
            this.showResponse(new MessageResponse("error server is not active, check the vpn status"));
        });
        this.socket.on("connect", () => {
            this.showResponse(new MessageResponse("ok ready to start"));
        });
    }

    sendHello() {
        this.socket.emit(Commands.SEND_HELLO, this.username);
    }

    giveMeMessage() {
        this.socket.emit(Commands.GET_MESSAGE, this.udpPort);
    }
}
</script>

<style scoped>
.quote {
    font-style: italic;
    font-size: 12px;
}


.message-history{
  padding: 10px;
  border-radius: 10px;
}
</style>
