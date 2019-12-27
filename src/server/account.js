/* @flow */
import * as paths from '../../webpack/paths';
import accountAssign from './models/accountAssign';
import type { IAccount, IDataBase, IDBAccount } from './models/account';
import app from './app';
import readJSONFromFile from '../utils/readJSONFromFile';

const database: IDataBase = readJSONFromFile(paths.resolve('./database.json'));
const getAccounts = (): Array<IAccount> => database.records.map((accountItem: IDBAccount) => {
  let value: ?IAccount = null;

  if (accountItem.group) {
    value = accountAssign({
      caption: accountItem.caption,
      group: accountItem.group,
      rid: accountItem.rid,
      mid: null,
    });
  } else {
    const { js_object, ...account } = accountItem;
    value = accountAssign(account);
  }

  return value;
});

app.get('/api/account/list', (req, res) => {
  res.send(getAccounts());
});

app.post('/api/account/update', ({ body: { rid, value } }, res) => {
  const { records } = database;
  const index = records.findIndex((account: IAccount) => account.rid === rid);

  if (index >= 0) {
    records[index] = {
      ...records[index],
      ...value,
    };
  } else {
    res.sendStatus(403);
  }
});
