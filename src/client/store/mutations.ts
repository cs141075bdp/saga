import IStore from './model';
import { IViewAccount } from '../../models/account';
import { TRecordMacrosInformation } from '../../server/autoPlay/models';
import { TPlayAccount } from '../../models/macrosTypes';

export const addSession = (state: IStore, value: string) => {
  state.sessions.push(value);
};

export const removeSession = (state: IStore, value: string) => {
  console.log(state, value);
};

export const accounts = (state: IStore, value: Array<IViewAccount>) => {
  state.accounts = value;
};

export const listMacros = (state: IStore, value: Array<TRecordMacrosInformation>) => {
  state.listMacros = value;
};

export const macrosAccount = (state: IStore, value: string) => {
  state.macrosAccount = value;
};

export const macrosAccounts = (state: IStore, value: Array<TPlayAccount>) => {
  state.macrosAccounts = value;
};
