<template>
    <v-container>

    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "home",
})

export default class Home extends Vue {

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

