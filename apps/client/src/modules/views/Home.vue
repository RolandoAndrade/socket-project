<template>
    <v-container>
      <v-btn @click="()=>sendHello()">HOLA</v-btn>
      <v-snackbar v-model="showMessage" :color="color" top right>{{message}}</v-snackbar>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Commands} from "../../../../server/src/messages/domain/commands";
import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import {EventBusMessages} from "../../../../server/src/shared/event-bus/domain/event-bus-messages";
import {MessageResponse} from "@/modules/responses/domain/response";

@Component({
  name: "home",
})

export default class Home extends Vue {
  private socket!: Socket;

  private color: string = '';
  private showMessage: boolean = false;
  private message: string = '';


  showResponse(response: MessageResponse){
    console.log(response)
    if(!response.isFailed()){
      this.message = response.getStatus() + response.getMessage();
      if(response.isSuccess()){
        this.color = "blue";
      }
      else {
        this.color = "error";
      }
    }else {
      this.color='error';
      this.message = "Error: Server didn't response"
    }
    this.showMessage = true;
  }

  created(){
    this.socket = io('ws://localhost:3000')
    this.socket.on(EventBusMessages.MESSAGE_RECEIVED, (data: string) => {
      this.showResponse(new MessageResponse(data));
    });
  }

  sendHello(){
    this.socket.emit(Commands.SEND_HELLO, "rjandrade.17")
  }
}

</script>

<style scoped>
.full-bg{
  width: 100%;
  height: calc(100vh - 64px);
}

.full-height{
  height: 100%;
  width: 100%;
}

.main-title{
  text-align: center;
  font-size: 5em;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: white;
  font-weight: lighter;
}

@media (max-width: 600px) {
  .main-title{
    font-size: 3em;
  }
}

</style>

