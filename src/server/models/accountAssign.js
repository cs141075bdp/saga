import assign from 'assign-deep';
import type { IAccount } from './account';

const deepCopy = (o: any) => JSON.parse(JSON.stringify(o));
const scaffold = (template: any) => (...models: any[]) => deepCopy(assign({}, template, ...models.filter(Boolean)));

const AccountStructure: IAccount = {
  rid: 0,
  mid: 0,
  caption: '',
  url: '',
  authorize: false,
  auth_url: '',
  time_last_work: '',
  time_next_active: '',
  accauntname: '',
  cookie: '',
  group: false,
  cookie_clear: false,
  active_job: false,
  auth_script_name: '',
};

const accountAssign = scaffold(AccountStructure);

export default accountAssign;
