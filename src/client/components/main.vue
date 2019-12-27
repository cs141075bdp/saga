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
          :key="account.rid"
          :account="account"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
  import api from '../router/api';
  import AccountRow from './accountRow';

  export default {
    components: {
      AccountRow,
    },

    data() {
      return {
        accounts: [],
      };
    },

    created() {
      api.account.list()
        .then(({ data }) => {
          this.accounts = data;
        });
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
