import * as paths from '../../../webpack/paths';
import accountAssign from '../../models/accountAssign';
import { IAccount, IDataBase, IDBAccount } from '../../models/account';
import app from '../app';
import { loadJSON, saveJSON } from '../modules/jsonStorage';
import migrate from './migrateDB';

const DATA_BASE_PATH = paths.resolve('./database.json');
const database: IDataBase = loadJSON(DATA_BASE_PATH) as IDataBase;

if (migrate(database)) {
  saveJSON(DATA_BASE_PATH, database);
}

const getAccounts = (): Array<IAccount> => database.records.map((accountItem: IDBAccount): IAccount => {
  let value: IAccount | null = null;

  if (accountItem.group) {
    const { caption, group, rid, mid } = accountItem;
    value = accountAssign({ caption, group, rid, mid });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { js_object, ...account } = accountItem;
    value = accountAssign(account);
  }

  return value;
});

app.get('/api/account/list', (req, res) => {
  res.send(getAccounts());
});

app.post('/api/account/update', ({ body: value }, res) => {
// app.patch('/api/account/update', ({ body: { rid, value } }, res) => {
  const { records } = database;
  const index = records.findIndex((account: IAccount) => account.rid === value.rid);

  if (index >= 0) {
    records[index] = {
      ...records[index],
      ...value,
    };
    saveJSON(DATA_BASE_PATH, database);
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

app.patch('/api/account/update', ({ body: value }, res) => {
  const { records } = database;
  const index = records.findIndex((account: IAccount) => account.rid === value.rid);

  if (index >= 0) {
    records[index] = {
      ...records[index],
      ...value,
    };
    saveJSON(DATA_BASE_PATH, database);
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});
