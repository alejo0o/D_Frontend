import axios, { AxiosRequestConfig } from 'axios';

export default function api(token: string) {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APIURL,
  });

  api.interceptors.request.use(
    (config) => {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
      return config;
    },
    (error) => {
      return error;
    }
  );

  return api;
}
