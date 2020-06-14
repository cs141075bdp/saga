import express from 'express';
import bodyParser from 'body-parser';

const cookieSession = require('cookie-session');

const app = express();

app.set('trust proxy', 1);

app.use(cookieSession({
  name: 'session',
  keys: ['mainKeySession1', 'mainKeySession2'],
}));

app.use((req, res, next) => {
  console.log(req.session);
  console.log(`received from : ${req.method} ${req.originalUrl}`);
  next();
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const rootDir = `${__dirname}/..`;

app.get('/', (req, res) => {
  res.sendFile('/public/index.html', { root: rootDir });
});

app.get('/saga/*', (req, res) => {
  res.sendFile('/public/index.html', { root: rootDir });
});

app.use(express.static(`${rootDir}/public`));

export default app;
