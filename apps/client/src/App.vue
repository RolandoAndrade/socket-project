<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  components: {
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
