export interface IAccount {
  rid: number;
  mid: number;
  caption: string;
  url: string;
  authorize: boolean;
  auth_url: string;
  time_last_work: string;
  time_next_active: string;
  accauntname: string;
  cookie: string;
  group: boolean;
  cookie_clear: boolean;
  active_job: boolean | null;
  auth_script_name: string;
  description: string | null;
}

export interface IDBAccount extends IAccount {
  js_object: string;
}

export interface IDataBase {
  records: Array<IDBAccount>;
}
