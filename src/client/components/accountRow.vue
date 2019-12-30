<template>
  <tr class="account-row">
    <td :class="captionClasses">
      <i v-if="account.hasChild" :class="['fa', opened ? 'fa-minus-square' : 'fa-plus-square' ]" aria-hidden="true" @click="toggleOpen" />
      <row-text v-model="account.caption" />
    </td>
    <td v-text="account.description" />
    <td>
      <check-box v-if="account.active_job !== null" v-model="account.active_job" />
    </td>
    <td v-text="account.time_last_work" />
    <td v-text="account.time_next_active" />
    <td v-text="account.accauntname" />
  </tr>
</template>

<script>
  import CheckBox from './checkbox';
  import RowText from './rowText';

  export default {
    components: {
      CheckBox,
      RowText,
    },

    props: {
      account: {
        type: Object,
        require: true,
        default: () => ({}),
      },
      opened: Boolean,
    },

    data() {
      return {
        editing: false,
      };
    },

    computed: {
      captionClasses() {
        const classes = [
          this.account.hasChild ? 'has-child' : '',
          `caption-level${this.account.level + 1}`,
        ];

        return classes.filter(Boolean).join(' ');
      },
    },

    watch: {
      account: {
        handler(value) {
          this.$emit('update', value);
        },
        deep: true,
      },
    },

    methods: {
      toggleOpen() {
        if (this.account.hasChild) {
          this.$emit('toggleOpen', this.account);
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .account-row {
    .fa {
      cursor: pointer;
      margin-left: -19px;
      position: absolute;
      margin-top: 4px;
    }
  }
</style>
