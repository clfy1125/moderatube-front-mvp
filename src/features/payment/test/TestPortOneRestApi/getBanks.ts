import { Bank } from '@portone/browser-sdk/v2';
import { useQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from './instance';

export interface IGetBanksRes {
  bank: Bank;
}

/* 은행 정보 조회 */
export const useGetBanks = () => {
  return useQuery<IGetBanksRes, AxiosError<IGetBanksRes>>({
    queryKey: ['getBanks'],
    queryFn: async () => {
      const { data } = await instance.get('/banks');

      if (!data) throw new Error('getBanks: Invalid server response');

      return data;
    }
  });
};
