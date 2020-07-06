import { Response } from 'express';
import app from '../app';
import recordsStorage from './RecordsStorage';
import * as paths from '../../utils/paths';
import { loadJSON } from '../modules/jsonStorage';
import { TPlayAccount } from '../../models/macrosTypes';

const DATA_BASE_PATH = paths.resolve('./storage/auto-play/accounts.json');
interface IErrorInfo {
  error: Error,
  message?: string,
}

const errorResponse = (res: Response, errorInfo: IErrorInfo) => {
  if (errorInfo.message) {
    console.error(errorInfo.message);
  }

  console.error(errorInfo.error);
  const message = errorInfo.message || 'Custom error. See log file.';

  res
    .status(500)
    .json(message)
    .end()
  ;
};

app.get('/api/auto-play/accounts', (req, res) => {
  const playAccounts: Array<TPlayAccount> = loadJSON(DATA_BASE_PATH) as Array<TPlayAccount>;
  res.send(playAccounts);
});
app.get('/api/auto-play/macros/*', (req, res, next) => {
  // console.log(`macros from : ${req.method} ${req.originalUrl}`);
  const workId = req.headers['work-id'];

  if (!workId) {
    errorResponse(res, {
      message: 'Identifier is not detected',
      error: new Error('Identifier is not detected'),
    });

    return;
  }

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
  recordsStorage.getRecords()
    .then((macroses) => {
      res.send(macroses);
    })
    .catch((error) => {
      errorResponse(res, {
        error,
      });
    })
  ;
});

app.post('/api/auto-play/macros/delete', ({ body: value }, res) => {
  try {
    recordsStorage.remove(value.id);
    res.sendStatus(200);
  } catch (e) {
    errorResponse(res, {
      error: e,
    });
  }
});

app.post('/api/auto-play/macros/append', ({ body: value }, res) => {
  try {
    recordsStorage.append('temporary.jrec', value);
    res.sendStatus(200);
  } catch (e) {
    errorResponse(res, {
      error: e,
    });
  }
});

app.get('/api/auto-play/macros/get-by-id', (req, res) => {
  try {
    res.send(recordsStorage.getById(parseInt(req.query.id, 10)));
  } catch (e) {
    errorResponse(res, {
      error: e,
    });
  }
});

app.get('/api/auto-play/macros/get-by-name', (req, res) => {
  try {
    res.send(recordsStorage.getPackedByName(req.query.name));
  } catch (e) {
    errorResponse(res, {
      error: e,
    });
  }
});

app.get('/api/auto-play/macros/get-by-long-name', (req, res) => {
  try {
    res.send(recordsStorage.getPackedByLongName(req.query.name));
  } catch (e) {
    errorResponse(res, {
      error: e,
    });
  }
});
