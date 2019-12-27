<template>
  <tr>
    <td v-text="account.caption" />
    <td v-text="account.time_last_work" />
    <td v-text="account.time_next_active" />
    <td v-text="account.accauntname" />
  </tr>
</template>

<script>
  export default {
    props: {
      account: {
        type: Object,
        require: true,
        default: () => ({}),
      },
    },
  };
</script>

<style scoped>

</style>
