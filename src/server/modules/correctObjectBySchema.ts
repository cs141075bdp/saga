import { isObject } from 'lodash';

interface IObjSchema {
  [key: string]: string | number | boolean | Object;
}
const correctObjectBySchema = (obj: IObjSchema, schema: IObjSchema): Object => {
  const localObj = JSON.parse(JSON.stringify(obj));
  const schemaProps = Object.keys(schema);
  const objProps = Object.keys(localObj);

  for (const prop of objProps) {
    if (schemaProps.includes(prop)) {
      if (isObject(localObj[prop]) && isObject(schema[prop])) {
        localObj[prop] = correctObjectBySchema(localObj[prop], schema[prop] as IObjSchema);
      }

      continue;
    }

    delete localObj[prop];
  }

  return localObj;
};

export default correctObjectBySchema;
