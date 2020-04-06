import assign from 'assign-deep';

const deepCopy = (o: Object) => JSON.parse(JSON.stringify(o));
const scaffold = (template: Object) => (...models: Object[]) => deepCopy(assign({}, template, ...models.filter(Boolean)));

export default scaffold;
