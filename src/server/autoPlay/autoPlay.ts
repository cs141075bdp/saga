import { Response } from 'express';
import app from '../app';
import recordsStorage from './RecordsStorage';
import * as paths from '../../utils/paths';
import { loadJSON } from '../modules/jsonStorage';

const DATA_BASE_PATH = paths.resolve('./storage/auto-play/accounts.json');
type TPlayAccount = {
  guid: string,
  name: string,
}

const errorResponse = (res: Response, error: Error) => {
  console.error(error);

  res
    .status(500)
    .json(error)
    .end()
  ;
};

app.get('/api/auto-play/accounts', (req, res) => {
  const playAccounts: Array<TPlayAccount> = loadJSON(DATA_BASE_PATH) as Array<TPlayAccount>;
  res.send(playAccounts);
});
app.get('/api/auto-play/macros/list', (req, res, next) => {
  console.log(`macros from : ${req.method} ${req.originalUrl}`);

  // if (req.originalUrl === '/api/auto-play/macros/list') {
  //   res
  //     .status(500)
  //     .end()
  //   ;
  // 
  //   return;
  // }

  next();
});

app.get('/api/auto-play/macros/list', (req, res) => {
  console.log('get');
  recordsStorage.getRecords()
    .then((macroses) => {
      res.send(macroses);
    })
    .catch((error) => {
      errorResponse(res, error);
    })
  ;
});

app.post('/api/auto-play/macros/delete', ({ body: value }, res) => {
  try {
    recordsStorage.remove(value.id);
    res.sendStatus(200);
  } catch (e) {
    errorResponse(res, e);
  }
});

app.post('/api/auto-play/macros/append', ({ body: value }, res) => {
  try {
    recordsStorage.append('temporary.jrec', value);
    res.sendStatus(200);
  } catch (e) {
    errorResponse(res, e);
  }
});

app.get('/api/auto-play/macros/get-by-id', (req, res) => {
  try {
    res.send(recordsStorage.getById(parseInt(req.query.id, 10)));
  } catch (e) {
    errorResponse(res, e);
  }
});

app.get('/api/auto-play/macros/get-by-name', (req, res) => {
  try {
    res.send(recordsStorage.getPackedByName(req.query.name));
  } catch (e) {
    errorResponse(res, e);
  }
});

app.get('/api/auto-play/macros/get-by-long-name', (req, res) => {
  try {
    res.send(recordsStorage.getPackedByLongName(req.query.name));
  } catch (e) {
    errorResponse(res, e);
  }
});
