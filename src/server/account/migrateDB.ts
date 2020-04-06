import { isUndefined } from 'lodash';
import type { IDataBase, IDBAccount } from '../../models/account';

const addDescription = (account: IDBAccount): boolean => {
  if (isUndefined(account.description)) {
    account.description = null;

    return true;
  }

  return false;
};

const migrate = (database: IDataBase): boolean => {
  let updated = false;

  for (const account of database.records) {
    const aUpdate = addDescription(account);
    updated = updated || aUpdate;
  }

  return updated;
};

export default migrate;
