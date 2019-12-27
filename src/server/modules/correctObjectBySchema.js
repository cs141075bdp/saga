/* @flow */
import { isObject } from 'lodash';

const correctObjectBySchema = (obj: Object, schema: Object): Object => {
  const localObj = JSON.parse(JSON.stringify(obj));
  const schemaProps = Object.keys(schema);
  const objProps = Object.keys(localObj);

  for (const prop of objProps) {
    if (schemaProps.includes(prop)) {
      if (isObject(localObj[prop])) {
        localObj[prop] = correctObjectBySchema(localObj[prop], schema[prop]);
      }

      continue;
    }

    delete localObj[prop];
  }

  return localObj;
};

export default correctObjectBySchema;
