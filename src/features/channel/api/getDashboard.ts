import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IGetDashboardReq {
  channel_id: string;
}

export interface IGetDashboardRes extends IDefaultRes {
  data: {
    channel_info: {
      channel_id: string;
      title: string;
      subscriber_count: number;
      spam_processed: number;
      total_comments: number;
      reviewed_comments: number;
    };
    spam_statistics: {
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
    recent_spam_ratio: {
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
    risk_analysis: {
      channel_id: string;
      channel_title: string;
      total_comments: number;
      reviewed_comments: number;
      unreviewed_comments: number;
      average_spam_index: number;
      risk_classification: 'clean' | 'low' | 'medium' | 'high';
      risk_distribution: {
        high: number;
        medium: number;
        low: number;
        clean: number;
      };
    };
  };
}

/* 대시보드 통합 조회: 특정 채널의 대시보드에 필요한 모든 데이터를 한 번에 조회합니다. */
export const useGetDashboard = () => {
  return useMutation<IGetDashboardRes, AxiosError<IGetDashboardRes>, IGetDashboardReq>({
    mutationKey: ['getDashboard'],
    mutationFn: async (params: IGetDashboardReq) => {
      const { data } = await instance().request({ method: 'GET', url: `/youtube/dashboard/${params.channel_id}/` });

      if (!data || !data.data) throw new Error('getDashboard: Invalid server response');

      return data;
    }
  });
};
