import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions';
// import * as getters from './getters';
import * as mutations from './mutations';
import { TRecordMacrosInformation } from '../../server/autoPlay/models';
import { IViewAccount } from '../../models/account';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    sessions: [],
    accounts: [] as Array<IViewAccount>,
    listMacros: [] as Array<TRecordMacrosInformation>,
  },

  strict: true,
  // actions,
  // getters,
  mutations,
});

export default store;
