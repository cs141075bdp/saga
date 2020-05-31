import { Response } from 'express';
import app from '../app';
import recordsStorage from './RecordsStorage';

const errorResponse = (res: Response, error: Error) => {
  res
    .status(500)
    .json(error)
    .end()
  ;
};

app.get('/api/auto-play/macros/list', (req, res) => {
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
    recordsStorage.append('Default.jrec', value);
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
    res.send(recordsStorage.getByName(req.query.name));
  } catch (e) {
    errorResponse(res, e);
  }
});

app.get('/api/auto-play/macros/get-by-long-name', (req, res) => {
  try {
    res.send(recordsStorage.getByName(req.query.name));
  } catch (e) {
    errorResponse(res, e);
  }
});
