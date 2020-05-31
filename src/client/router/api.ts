import axios, { AxiosResponse } from 'axios';
import { TRecordMacrosInformation } from '../../server/autoPlay/models';

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
    list(): Promise<AxiosResponse<Array<TRecordMacrosInformation>>> {
      return axiosInstance.get(genUrl('api/auto-play/macros/list'));
    },

    remove(id: number) {
      return axiosInstance.post(genUrl('api/auto-play/macros/delete'), { id });
    },

    getById(id: number) {
      return axiosInstance.get(genUrl('api/auto-play/macros/get-by-id', { id }));
    },
  },
};
