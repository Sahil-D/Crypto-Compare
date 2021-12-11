import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'https://crypto-cmp.herokuapp.com/api',
});
