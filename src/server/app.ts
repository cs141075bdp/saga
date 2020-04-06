import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use((req, res, next) => {
  console.log(`received from : ${req.method} ${req.originalUrl}`);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const rootDir = `${__dirname}/..`;

app.get('/', (req, res) => {
  res.sendFile('/public/index.html', { root: rootDir });
});

app.use(express.static(`${rootDir}/public`));

export default app;
