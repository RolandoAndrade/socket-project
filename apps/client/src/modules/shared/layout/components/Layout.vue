<template>
  <div>
    <v-app-bar
        app
        class="gradient-primary"
        dark
        flat
    >
      <v-row class="content-size align-center">
        <v-avatar tile>
          <v-img :src="require('@/assets/logo.png')"></v-img>
        </v-avatar>

        <v-spacer></v-spacer>
        <v-btn color="transparent" class="elevation-0 overline">EVENTOS</v-btn>
        <v-btn color="transparent" class="elevation-0 overline">NOSOTROS</v-btn>
        <v-btn color="transparent" class="elevation-0 overline">GRUPOS DE ESTUDIO</v-btn>
        <v-btn color="transparent" class="elevation-0 overline">RECURSOS</v-btn>
      </v-row>
    </v-app-bar>

    <v-main>
      <slot></slot>
    </v-main>
  </div>

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "layout",
})

export default class Layout extends Vue {

}

</script>

<style scoped>
</style>

