import axios from 'axios';

export const nextAxios = axios.create({
  baseURL: '', // пусто = запити йдуть на той самий origin, тобто localhost:3000
  headers: {
    'Content-Type': 'application/json',
  },
});
