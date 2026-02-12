import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostChannelSpamAnalysisReq {
  channelId: string;
  post_action: 'none' | 'delete' | 'hide';
}

export interface IPostChannelSpamAnalysisRes extends IDefaultRes {
  data: {
    channel_id: string;
    channel_title: string;
    chunks_created: number;
    credits_deducted: number;
    failed_comments: number;
    message: string;
    remaining_credits: number;
    successful_comments: number;
    successful_requests: number;
    total_comments: number;
    total_videos: number;
  };
}

/** 채널 기반 스팸 분석: 채널 ID를 받아 해당 채널의 모든 비디오의 댓글을 조회하여 AI 스팸 분석을 실행합니다. */
export const usePostChannelSpamAnalysis = () => {
  return useMutation<IPostChannelSpamAnalysisRes, AxiosError<IPostChannelSpamAnalysisRes>, IPostChannelSpamAnalysisReq>({
    mutationKey: ['postChannelSpamAnalysis'],
    mutationFn: async (params: IPostChannelSpamAnalysisReq) => {
      const { data } = await instance().post<IPostChannelSpamAnalysisRes>(`/youtube/spam_analysis/channel/${params.channelId}`, { post_action: params.post_action });

      if (!data) throw new Error('postChannelSpamAnalysis: Invalid server response');

      return data;
    }
  });
};
