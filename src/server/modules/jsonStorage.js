const fs = require('fs');

export const loadJSON = (path) => {
  const data = fs.readFileSync(path, 'utf8');

  return JSON.parse(data);
};

export const saveJSON = (path, obj) => fs.writeFileSync(path, JSON.stringify(obj, null, 4), 'utf8');
