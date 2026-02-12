import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IGetChannelInfoReq {
  channel_id: string;
}

export interface IGetChannelInfoRes extends IDefaultRes {
  data: {
    channel_id: string;
    title: string;
    subscriber_count: number;
    spam_processed: number;
    total_comments: number;
    reviewed_comments: number;
  };
}

/* 채널 정보 조회: 특정 채널의 정보와 스팸 처리 통계를 조회합니다. */
export const useGetChannelInfo = () => {
  return useMutation<IGetChannelInfoRes, AxiosError<IGetChannelInfoRes>, IGetChannelInfoReq>({
    mutationKey: ['getChannelInfo'],
    mutationFn: async (params: IGetChannelInfoReq) => {
      const { data } = await instance().request({ method: 'GET', url: `/youtube/dashboard/${params.channel_id}/channel-info/` });

      if (!data || !data.data) throw new Error('getChannelInfo: Invalid server response');

      return data;
    }
  });
};
