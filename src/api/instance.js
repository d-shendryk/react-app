import axios from 'axios';

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL
  ? import.meta.env.VITE_REACT_APP_BASE_URL
  : 'http://127.0.0.1/';

const authToken = import.meta.env.VITE_REACT_APP_AUTH_TOKEN;

export const client = axios.create({
  baseURL: baseUrl,
  params: { auth: authToken },
});
