const fs = require('fs');

export const loadJSON = (path: string): Object => {
  const data = fs.readFileSync(path, 'utf8');

  return JSON.parse(data);
};

export const saveJSON = (path: string, obj: Object): void => fs.writeFileSync(path, JSON.stringify(obj, null, 4), 'utf8');
