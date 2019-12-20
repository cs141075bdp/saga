const { clientConfig } = require('./webpack/clientConfig');
const { serverConfig } = require('./webpack/serverConfig');

module.exports = [
  clientConfig,
  serverConfig,
];
