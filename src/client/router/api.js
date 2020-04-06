import axios from 'axios';

const genUrl = pathName => `${window.location.href}${pathName}`;
const axiosInstance = axios.create({});

export default {
  account: {
    list() {
      return axiosInstance.get(genUrl('api/account/list'));
    },

    update(data) {
      return axiosInstance.post(genUrl('api/account/update'), data);
    },
  },
};
