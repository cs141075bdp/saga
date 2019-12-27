<template>
  <div class="main-accounts">
    <table class="table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Последний запуск</th>
          <th>Следующий запуск</th>
          <th>Account</th>
        </tr>
      </thead>
      <tbody>
        <account-row
          v-for="account in accounts"
          v-show="!hiddenRows.includes(account.rid)"
          :key="account.rid"
          :account="account"
          :opened="!closeGroups.includes(account.rid)"
          @toggleOpen="toggleOpen"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
  import type { IAccount } from '../../models/account';
  import api from '../router/api';
  import AccountRow from './accountRow';

  export default {
    components: {
      AccountRow,
    },

    data() {
      return {
        accounts: [],
        closeGroups: [],
      };
    },

    computed: {
      hiddenRows() {
        const findChildren = (rid: number) => {
          const rids = this.getChildrenAccounts(rid).map((account: IAccount) => account.rid);

          return [...rids, ...rids.map(findChildren)];
        };

        return this.closeGroups.map(findChildren).flat(5);
      },
    },

    created() {
      api.account.list()
        .then(({ data }) => {
          const getLevel = (account: ?IAccount): number => {
            if (!account || !account.mid) {
              return 0;
            }

            return 1 + getLevel(data.find((item: IAccount) => item.rid === account.mid));
          };
          const getAdditionalProps = (account: ?IAccount) => {
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
        });
    },

    methods: {
      toggleOpen(account: IAccount) {
        if (this.closeGroups.includes(account.rid)) {
          const index = this.closeGroups.indexOf(account.rid);
          this.closeGroups.splice(index, 1);
        } else {
          this.closeGroups.push(account.rid);
        }
      },

      getChildrenAccounts(mid: number) {
        return this.accounts.filter((account: IAccount) => account.mid === mid);
      },
    },
  };
</script>

<style lang="less">
  @import "../css/main";

  .main-accounts {
    .table {
      max-width: 900px;
      margin: 10px auto;
      background-color: silver;
    }
  }
</style>
