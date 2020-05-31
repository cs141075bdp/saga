<template>
  <div class="main-macros">
    <button @click="remove(1)">delete 1</button>
    <button @click="remove(1575500340)">delete 1575499719</button>
    <table class="table">
      <thead>
        <tr>
          <th>File</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in macroses" :key="item.id">
          <th v-text="item.file" />
          <th v-text="item.macros" />
          <th v-text="item.description" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Api from '../router/api';

  export default Vue.extend({

    data() {
      return {
        macroses: [...this.$store.state.listMacros],
      };
    },

    created() {
      if (this.macroses.length === 0) {
        Api.macros.list()
          .then((response) => {
            this.macroses = response.data;
            this.$store.commit('listMacros', this.macroses);
          });
      }
    },

    methods: {
      remove(id: number) {
        Api.macros.getById(id);
      },
    },
  });
</script>

<style scoped>

</style>
