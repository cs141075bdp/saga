import * as paths from '../../utils/paths';
import { loadJSON } from '../modules/jsonStorage';
import { RecordsStorage } from './RecordsStorage';

const RECORDS_SUB_PATH = './storage/auto-play/';
interface IRecordStorageAccount {
  guid: string,
  authGuid: string,
  name: string,
}
class RecordsStorageAccounts {
  private accounts: Array<IRecordStorageAccount>;

  private storages: Map<string, RecordsStorage>;

  constructor() {
    const filePath = paths.resolve(`${RECORDS_SUB_PATH}accounts.json`);
    this.accounts = loadJSON(filePath) as Array<IRecordStorageAccount>;
    this.storages = new Map();
  }

  hasAccount(accountId: string): boolean {
    return !!this.accounts.find(item => item.guid === accountId);
  }

  getAccountStorage(accountId: string): RecordsStorage {

  }
}

export default RecordsStorageAccounts;
