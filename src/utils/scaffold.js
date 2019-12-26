import assign from 'assign-deep';

const deepCopy = (o: any) => JSON.parse(JSON.stringify(o));
const scaffold = (template: any) => (...models: any[]) => deepCopy(assign({}, template, ...models.filter(Boolean)));

export default scaffold;
