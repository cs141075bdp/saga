/* @flow */
import * as paths from '../../../webpack/paths';
import accountAssign from '../../models/accountAssign';
import type { IAccount, IDataBase, IDBAccount } from '../../models/account';
import app from '../app';
import correctObjectBySchema from '../modules/correctObjectBySchema';
import { loadJSON, saveJSON } from '../modules/jsonStorage';

const DATA_BASE_PATH = paths.resolve('./database.json');
const database: IDataBase = loadJSON(DATA_BASE_PATH);
const getAccounts = (): Array<IAccount> => database.records.map((accountItem: IDBAccount) => {
  let value: ?IAccount = null;

  if (accountItem.group) {
    const { caption, group, rid, mid } = accountItem;
    value = accountAssign({ caption, group, rid, mid });
  } else {
    const { js_object, ...account } = accountItem;
    value = accountAssign(account);
  }

  return value;
});

app.get('/api/account/list', (req, res) => {
  res.send(getAccounts());
});

app.patch('/api/account/update', ({ body: value }, res) => {
// app.patch('/api/account/update', ({ body: { rid, value } }, res) => {
  const { records } = database;
  const index = records.findIndex((account: IAccount) => account.rid === value.rid);

  if (index >= 0) {
    records[index] = {
      ...records[index],
      ...correctObjectBySchema(value, records[index]),
    };
    saveJSON(DATA_BASE_PATH, database);
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});
