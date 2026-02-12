import { useQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IGetKeywordsRes extends IDefaultRes {
  data: {
    id: number;
    keyword_count: number;
    created_at: string;
    updated_at: string;
    keywords?: string[];
  };
}

/** 키워드 조회 */
export const useGetKeywords = () => {
  return useQuery<IGetKeywordsRes, AxiosError<IGetKeywordsRes>>({
    queryKey: ['getKeywords'],
    queryFn: async () => {
      const { data } = await instance().get<IGetKeywordsRes>('/accounts/keywords/');

      if (!data) throw new Error('getKeywords: Invalid server response');

      return data;
    },
    enabled: false
  });
};
