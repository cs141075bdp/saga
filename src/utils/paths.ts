const path = require('path');

export const resolve = (dir: string) => path.join(__dirname, '../', dir);

export const assetsPath = (_path: string) => {
  const assetsSubDirectory = '';

  return path.posix.join(assetsSubDirectory, _path);
};
