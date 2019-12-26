import * as paths from '../../webpack/paths';
import app from './app';
import readJSONFromFile from '../utils/readJSONFromFile';

const database = readJSONFromFile(paths.resolve('./database.json'));

app.get('/api/account/list', (req, res) => {
  const records = database.records.map(accountItem => {
    if (accountItem.group) {
      return {
        caption: accountItem.caption,
        group: accountItem.group,
        rid: accountItem.rid,
        mid: null,
      };
    }
  });
  res.send(records);
});

app.post('/api/account/update', ({ body: { rid, value }}, res) => {
  const records = database.records;
  const index = records.find(account => account.rid === rid);

  if (index >= 0) {
    records[index] = {
      ...records[index],
      ...value,
    };
  } else {
    res.sendStatus(403);
  }
});
