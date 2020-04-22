import axios from 'axios';

const genUrl = (pathName: string) => `${window.location.href}${pathName}`;
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
};
