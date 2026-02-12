import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostKeywordsReq {
  keywords: string[];
}

export interface IPostKeywordsRes extends IDefaultRes {
  data: {
    id: number;
    keyword_count: number;
    created_at: string;
    updated_at: string;
    keywords?: string[];
  };
}

/** 키워드 등록/업데이트 (최대 20개) */
export const usePostKeywords = (params: IPostKeywordsReq) => {
  return useMutation<IPostKeywordsRes, AxiosError<IPostKeywordsRes>, IPostKeywordsReq>({
    mutationKey: ['postKeywords'],
    mutationFn: async () => {
      const { data } = await instance().post<IPostKeywordsRes>('/accounts/keywords/', params);

      if (!data) throw new Error('postKeywords: Invalid server response');

      return data;
    }
  });
};
