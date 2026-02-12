import axios from 'axios';

import { tokenRefresh } from './refresh';
import { getTokens } from './token';

const PRODUCT_API_URL = import.meta.env.VITE_API_URL + '/api';

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (err: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token!);
  });

  failedQueue = [];
};

export const instance = () => {
  const localTokens = getTokens();
  const accessToken: string = localTokens && JSON.parse(localTokens).accessToken;

  const created = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? '/api' : PRODUCT_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` })
    }
  });

  created.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );

  created.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalReq = error.config;

      if (error.response?.status === 401 && !originalReq._retry) {
        originalReq._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalReq.headers.Authorization = `Bearer ${token}`;

            return axios(originalReq);
          });
        }

        isRefreshing = true;

        return tokenRefresh()
          .then((newToken) => {
            if (!newToken) return Promise.reject(error);

            originalReq.headers.Authorization = `Bearer ${newToken}`;
            processQueue(null, newToken);

            return axios(originalReq);
          })
          .catch((err) => {
            processQueue(err, null);

            return Promise.reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      return Promise.reject(error);
    }
  );

  return created;
};
