const path = require('path');

exports.resolve = dir => path.join(__dirname, '../', dir);

exports.assetsPath = (_path) => {
  const assetsSubDirectory = '';

  return path.posix.join(assetsSubDirectory, _path);
};
