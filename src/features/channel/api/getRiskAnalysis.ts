import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IGetRiskAnalysisReq {
  channel_id: string;
}

export interface IGetRiskAnalysisRes extends IDefaultRes {
  data: {
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
}

/* 위험도 분석 조회: 특정 채널의 검사/미검사 댓글 수와 spam_index 기반 위험도 분류를 조회합니다. */
export const useGetRiskAnalysis = () => {
  return useMutation<IGetRiskAnalysisRes, AxiosError<IGetRiskAnalysisRes>, IGetRiskAnalysisReq>({
    mutationKey: ['getRiskAnalysis'],
    mutationFn: async (params: IGetRiskAnalysisReq) => {
      const { data } = await instance().request({ method: 'GET', url: `/youtube/dashboard/${params.channel_id}/risk-analysis/` });

      if (!data || !data.data) throw new Error('getRiskAnalysis: Invalid server response');

      return data;
    }
  });
};
