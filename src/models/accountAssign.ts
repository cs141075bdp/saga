import scaffold from '../utils/scaffold';
import { IAccount } from './account';

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
  active_job: null,
  auth_script_name: '',
  description: null,
};

const accountAssign: (obj: Object) => IAccount = scaffold(AccountStructure);

export default accountAssign;
