const fs = require('fs');

export const loadJSON = (path: string): Object => {
  const data = fs.readFileSync(path, 'utf8');

  return JSON.parse(data);
};
export type TJSONFormatter = (value: Object | Array<any>) => string;
const defaultFormatter: TJSONFormatter = (value: Object | Array<any>) => JSON.stringify(value, null, 4);
export const saveJSON = (path: string, obj: Object, formatter: TJSONFormatter = defaultFormatter): void => fs.writeFileSync(path, formatter(obj), 'utf8');
