<template>
  <div class="main-accounts main-tables">
    <table class="table">
      <thead>
        <tr>
          <th v-for="item in schema" :key="item.name" :style="item.style" v-text="item.caption" />
        </tr>
      </thead>
      <tbody>
        <account-row
          v-for="account in accounts"
          v-show="!hiddenRows.includes(account.rid)"
          :key="account.rid"
          :account="account"
          :opened="!closeGroups.includes(account.rid)"
          :schema="schema"
          @toggleOpen="toggleOpen"
          @update="updateAccount"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import type { IAccount, IViewAccount } from '../../models/account';
  import Api from '../router/api';
  import AccountRow from './accountRow.vue';

  const schema = [
    { caption: 'Название', name: 'caption' },
    { caption: 'Описание', name: 'description' },
    { caption: 'Авто', name: 'active_job' },
    { caption: 'Последний запуск', name: 'time_last_work', style: 'width: 11em;' },
    { caption: 'Следующий запуск', name: 'time_next_active', style: 'width: 11em;' },
    { caption: 'Account', name: 'accauntname' },
  ];

  export default Vue.extend({
    components: {
      AccountRow,
    },

    data() {
      return {
        accounts: [...this.$store.state.accounts] as Array<IViewAccount>,
        closeGroups: [] as number[],
        schema,
      };
    },

    computed: {
      hiddenRows(): number[] {
        const findChildren = (rid: number): Array<number> => {
          const rids: number[] = this.getChildrenAccounts(rid).map((account: IViewAccount): number => account.rid);

          return [...rids, ...rids.map(findChildren)].flat(5);
        };

        return this.closeGroups.map(findChildren).flat(5);
      },
    },

    created() {
      if (this.accounts.length === 0) {
        Api.account.list()
          .then(({ data }) => {
            const getLevel = (account: IAccount | IViewAccount | null): number => {
              if (!account || !account.mid) {
                return 0;
              }

              return 1 + getLevel(data.find((item: IViewAccount) => item.rid === account.mid));
            };
            const getAdditionalProps = (account: IAccount) => {
              const level = getLevel(account);

              return {
                level,
                hasChild: !!data.find((item: IAccount) => item.mid === account.rid),
              };
            };
            this.accounts = data.map((account: IAccount) => ({
              ...account,
              ...getAdditionalProps(account),
            }));
            this.$store.commit('accounts', this.accounts);
          });
      }
    },

    methods: {
      toggleOpen(account: IViewAccount): void {
        if (this.closeGroups.includes(account.rid)) {
          const index = this.closeGroups.indexOf(account.rid);
          this.closeGroups.splice(index, 1);
        } else {
          this.closeGroups.push(account.rid);
        }
      },

      updateAccount(account: IViewAccount): void {
        const { level, hasChild, ...baseAccount } = account;
        Api.account.update(baseAccount)
          .then(() => {
            console.log('update');
          });
      },

      getChildrenAccounts(mid: number): Array<IViewAccount> {
        return this.accounts.filter((account: IAccount) => account.mid === mid);
      },
    },
  });
</script>
