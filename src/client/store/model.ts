import { IViewAccount } from '../../models/account';
import { TRecordMacrosInformation } from '../../server/autoPlay/models';

export default interface IStore {
  sessions: string[],
  accounts: Array<IViewAccount>,
  listMacros: Array<TRecordMacrosInformation>,
};
