/*  eslint-disable import/no-unresolved, import/no-extraneous-dependencies, import/no-absolute-path */

import express from 'express';
import bodyParser from 'body-parser';
import * as paths from '../../webpack/paths';
import readJSONFromFile from '../utils/readJSONFromFile';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const database = readJSONFromFile(paths.resolve('./database.json'));
const records = database.records;

app.post('/message', ({ body: { name, message } }, res) => {
  console.log(message, name);
  res.sendStatus(200);
});

app.get('/list', (req, res) => {
  res.send(records);
});

app.post('/update', ({ body: { rid, value }}, res) => {
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

app.get('/', (req, res) => {
  res.sendFile('/public/index.html', { root: __dirname });
});

app.use(express.static(`${__dirname}/public`));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
