const dotEnvFiles = ['.env.local', '.env'];

const getEnv = () => {
  for (const file of dotEnvFiles) {
    const dotEnv = require('dotenv').config({
      path: __dirname + `/../${file}`,
    });

    if (dotEnv.parsed) {
      return dotEnv.parsed;
    }
  }

  return null;
};
const env = getEnv();
exports.getEnv = getEnv;
exports.isProduction = env && env.APP_ENV === 'prod' || env.APP_ENV === 'test';
