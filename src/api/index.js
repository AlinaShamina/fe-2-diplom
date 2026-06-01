import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://students.netoservices.ru/fe-diplom',

  timeout: 30000,
});

export default api;