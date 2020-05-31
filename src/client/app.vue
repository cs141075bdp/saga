<template>
  <div id="app">
    <a href="/" @click.prevent="changeRoute">Accounts</a>
    <a href="/play-macros" @click.prevent="changeRoute">Macroses</a>
    <router-view />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    methods: {
      changeRoute(elem: MouseEvent):void {
        const location = (elem.target as HTMLLinkElement).getAttribute('href');

        if (location) {
          this.$router.push(location);
        }
      },
    },
  });
</script>

<style lang="less">
  @import "css/app";
</style>
