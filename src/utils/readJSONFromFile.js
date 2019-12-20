const fs = require('fs');

module.exports = path => {
  const data = fs.readFileSync(path, 'utf8');
  return JSON.parse(data);
};
