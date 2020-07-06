import { IViewAccount } from '../../models/account';
import { TRecordMacrosInformation } from '../../server/autoPlay/models';
import { TPlayAccount } from '../../models/macrosTypes';

export default interface IStore {
  sessions: string[],
  accounts: Array<IViewAccount>,
  listMacros: Array<TRecordMacrosInformation>,
  macrosAccount: string | null,
  macrosAccounts: Array<TPlayAccount>,
};
