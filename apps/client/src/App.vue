<template>
  <v-app>
    <layout>
      <router-view></router-view>
    </layout>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Layout from "@/modules/shared/layout/components/Layout.vue";

export default Vue.extend({
  name: 'App',

  components: {
    Layout,
    HelloWorld,
  },

  data: () => ({
    //
  }),
});
</script>

<style>
.content-size{
  max-width: 1200px !important;
  margin: 0 auto;
}

.gradient-primary{
  background: linear-gradient(90deg, rgba(35,15,50,1) 0%, rgba(115,75,110,1) 100%) !important;
}
</style>
