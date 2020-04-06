/*  eslint-disable import/no-unresolved, import/no-extraneous-dependencies, import/no-absolute-path */

import app from './app';
import './account/account';

app.post('/api/message', ({ body: { name, message } }, res) => {
  console.log(message, name);
  res.sendStatus(200);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
