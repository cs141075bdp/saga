import scaffold from '../../utils/scaffold';
import type { IAccount } from '../../models/account';

const AccountStructure: IAccount = {
  rid: 0,
  mid: null,
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
