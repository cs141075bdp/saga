<template>
  <div class="fancy square">
    <label>
      <input v-model="data" type="checkbox">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';

  export default Vue.extend({
    props: {
      value: Boolean as PropType<boolean>,
    },

    data() {
      return {
        data: this.value,
      };
    },

    watch: {
      data: {
        handler(value) {
          this.$emit('input', value);
        },
      },
      value: {
        handler(value) {
          this.data = value;
        },
      },
    },
  });
</script>

<style lang="less">
  @import "../css/checkbox";
</style>
