import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IGetSpamRatioReq {
  channel_id: string;
}

export interface IGetSpamRatioRes extends IDefaultRes {
  data: {
    channel_id: string;
    channel_title: string;
    daily_data: {
      date: string;
      total_comments: number;
      spam_comments: number;
      spam_ratio: number;
    }[];

    total_comments: number;
    total_spam: number;
    spam_ratio: number;
  };
}

/* 최근 스팸 댓글 비율 조회: 특정 채널의 오늘 제외 7일간의 스팸 검사 결과 비율을 조회합니다. */
export const useGetSpamRatio = () => {
  return useMutation<IGetSpamRatioRes, AxiosError<IGetSpamRatioRes>, IGetSpamRatioReq>({
    mutationKey: ['getSpamRatio'],
    mutationFn: async (params: IGetSpamRatioReq) => {
      const { data } = await instance().request({ method: 'GET', url: `/youtube/dashboard/${params.channel_id}/spam-ratio/` });

      if (!data || !data.data) throw new Error('getSpamRatio: Invalid server response');

      return data;
    }
  });
};
