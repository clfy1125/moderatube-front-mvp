import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IGetSpamStatisticsReq {
  channel_id: string;
}

export interface IGetSpamStatisticsRes extends IDefaultRes {
  data: {
    today: {
      count: number;
      change_percentage: number;
    };
    this_week: {
      count: number;
      change_percentage: number;
    };
    this_month: {
      count: number;
      change_percentage: number;
    };
    three_months: {
      count: number;
      change_percentage: number;
    };
  };
}

/* 스팸 통계 조회: 특정 채널의 오늘, 이번 주, 이번 달, 3개월간의 스팸 수와 변화량을 조회합니다. */
export const useGetSpamStatistics = () => {
  return useMutation<IGetSpamStatisticsRes, AxiosError<IGetSpamStatisticsRes>, IGetSpamStatisticsReq>({
    mutationKey: ['getSpamStatistics'],
    mutationFn: async (params: IGetSpamStatisticsReq) => {
      const { data } = await instance().request({ method: 'GET', url: `/youtube/dashboard/${params.channel_id}/spam-statistics/` });

      if (!data || !data.data) throw new Error('getSpamStatistics: Invalid server response');

      return data;
    }
  });
};
