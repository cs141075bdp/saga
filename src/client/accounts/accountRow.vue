<template>
  <tr class="account-row" @mouseenter="hover = true" @mouseleave="hover = false">
    <td :class="captionClasses" valign="middle">
      <i v-if="account.hasChild" :class="['fa', opened ? 'fa-minus-square' : 'fa-plus-square' ]" aria-hidden="true" @click="toggleOpen" />
      <row-text v-model="account.caption" :hover="hover" />
    </td>
    <td>
      <row-text v-model="account.description" :hover="hover" />
    </td>
    <td>
      <check-box v-if="account.active_job !== null" v-model="account.active_job" />
    </td>
    <td valign="middle" v-text="account.time_last_work" />
    <td valign="middle" v-text="account.time_next_active" />
    <td valign="middle" v-text="account.accauntname" />
  </tr>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';
  import CheckBox from '../components/checkbox.vue';
  import RowText from '../components/rowText.vue';
  import { IViewAccount } from '../../models/account';

  export default Vue.extend({
    components: {
      CheckBox,
      RowText,
    },

    props: {
      account: {
        type: Object as PropType<IViewAccount>,
        required: true,
      },
      opened: Boolean as PropType<boolean>,
      schema: {
        type: Array as PropType<Array<string>>,
        required: true,
      },
    },

    data() {
      return {
        editing: false as Boolean,
        hover: false as Boolean,
      };
    },

    computed: {
      captionClasses(): string {
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
      toggleOpen(): void {
        if (this.account.hasChild) {
          this.$emit('toggleOpen', this.account);
        }
      },
    },
  });
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
