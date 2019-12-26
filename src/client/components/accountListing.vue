<template>
  <div>
    {{ accounts.length }}
  </div>
</template>

<script>
  import api from '../router/api';

  export default {
    data() {
      return {
        accounts: [],
      };
    },

    created() {
      api.account.list()
        .then((res) => {
          console.log(res);
        });
    },
  };
</script>

<style scoped>

</style>
