<template>
  <div class="main-macros main-tables">
    <table class="table">
      <thead>
        <tr>
          <th>File</th>
          <th>Name</th>
          <th>Description</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in macroses" :key="item.id">
          <td v-text="item.file" />
          <td>
            <a href="#" @click.prevent="demo(item)">
              {{ getName(item) }}
            </a>
          </td>
          <td v-text="item.description" />
          <td class="actions">
            <i :class="['fa', 'fa-trash']" aria-hidden="true" @click="removeItem(item)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Api from '../router/api';
  import { TRecordMacrosInformation } from '../../server/autoPlay/models';

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
      demo(item: TRecordMacrosInformation) {
        Api.macros.getByLongName(this.getName(item));
      },

      getName(item: TRecordMacrosInformation) {
        const fileName = item.file.replace('.jrec', '');

        return `${fileName}.${item.macros}`;
      },

      removeItem(item: TRecordMacrosInformation) {
        if (!window.confirm('Удалить запись?')) {
          return;
        }

        Api.macros.remove(item.id)
          .then(() => {
            const index = this.macroses.findIndex(record => record.id === item.id);

            if (index >= 0) {
              this.macroses.splice(index, 1);
            }
          })
        ;
      },
    },
  });
</script>

<style lang="less">
  .actions {
    .fa {
      color: #747474;
      cursor: pointer;

      &:hover {
        color: black;
      }
    }
  }
</style>
