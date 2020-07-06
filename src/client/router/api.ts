import axios, { AxiosResponse } from 'axios';
import { TRecordMacrosInformation } from '../../server/autoPlay/models';
import { TPlayAccount } from '../../models/macrosTypes';

const genUrl = (pathName: string, params: Object = {}) => {
  // @ts-ignore
  let query = new URLSearchParams(params).toString();

  if (query) {
    query = `?${query}`;
  }

  return `${window.location.origin}/${pathName}${query}`;
};
const axiosInstance = axios.create({});

export default {
  account: {
    list() {
      return axiosInstance.get(genUrl('api/account/list'));
    },

    update(data: Object) {
      return axiosInstance.post(genUrl('api/account/update'), data);
    },
  },

  macros: {
    accounts(): Promise<AxiosResponse<Array<TPlayAccount>>> {
      return axiosInstance.get(genUrl('api/auto-play/accounts'));
    },

    list(accountId: string | null): Promise<AxiosResponse<Array<TRecordMacrosInformation>>> {
      return axiosInstance.get(genUrl('api/auto-play/macros/list'), { headers: { 'work-id': accountId } });
    },

    remove(accountId: string | null, id: number) {
      return axiosInstance.post(genUrl('api/auto-play/macros/delete'), { id }, { headers: { 'work-id': accountId } });
    },

    getById(accountId: string | null, id: number): Promise<AxiosResponse<TRecordMacrosInformation>> {
      return axiosInstance.get(genUrl('api/auto-play/macros/get-by-id', { id }), { headers: { 'work-id': accountId } });
    },

    getByLongName(accountId: string | null, name: string): Promise<AxiosResponse<TRecordMacrosInformation>> {
      return axiosInstance.get(genUrl('api/auto-play/macros/get-by-long-name', { name }), { headers: { 'work-id': accountId } });
    },
  },
};
