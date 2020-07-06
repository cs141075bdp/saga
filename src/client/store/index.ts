import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions';
// import * as getters from './getters';
import * as mutations from './mutations';
import { TRecordMacrosInformation } from '../../server/autoPlay/models';
import { IViewAccount } from '../../models/account';
import IStore from './model';
import { TPlayAccount } from '../../models/macrosTypes';

Vue.use(Vuex);

const store = new Vuex.Store<IStore>({
  state: {
    sessions: [],
    accounts: [] as Array<IViewAccount>,
    listMacros: [] as Array<TRecordMacrosInformation>,
    macrosAccount: null,
    macrosAccounts: Array<TPlayAccount>(0),
  },

  strict: true,
  // actions,
  // getters,
  mutations,
});

export default store;
