<template>
    <v-container>
      <v-btn @click="()=>sendHello()">HOLA</v-btn>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Commands} from "../../../../server/src/messages/domain/commands";
import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

@Component({
  name: "home",
})

export default class Home extends Vue {
  private socket!: Socket;

  private s!: any

  created(){
    this.socket = io('ws://localhost:3000')
    /*this.socket.on('connect', function(data) {

    });
    this.socket.on('disconnect', function () {

    });
    this.socket.on('reconnect', function () {

    });
    this.socket.on('reconnect_error', function () {

    });*/
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

