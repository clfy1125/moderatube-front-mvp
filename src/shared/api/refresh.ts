/* eslint-disable prettier/prettier */

import { instance } from './instance';
import { getTokens, removeTokens, setTokens } from './token';

const isRefresh = false;

export const waitForRefresh = () =>
  new Promise((resolve, reject) => {
    try {
      const interval = setInterval(() => {
        if (!isRefresh) {
          clearInterval(interval);
          resolve(true);
        }
      }, 10);
    } catch {
      reject(null);
    }
  });

export const tokenRefresh = async () => {
  const localTokens = getTokens();
  if (!localTokens) return false;

  const { accessToken, refreshToken } = JSON.parse(localTokens);
  if (!accessToken || !refreshToken) return false;

  try {
    /** accessToken 재발급 */    
    const { data } = await instance().post('/auth/refresh-token/', { refresh: refreshToken });
    if (!data.success) return false;
    
    setTokens(data.data.access, refreshToken);

    return data.data.access;
  } catch (err) {    
    console.log('토큰리프레시 실패 catch', err);
    removeTokens();

    return false;
  }
};
