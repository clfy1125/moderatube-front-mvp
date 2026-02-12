import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostVideosSpamAnalysisReq {
  video_ids: string[];
  post_action: 'none' | 'delete' | 'hide';
}

export interface IPostVideosSpamAnalysisRes extends IDefaultRes {
  data: {
    total_comments: number;
    chunks_created: number;
    successful_requests: number;
    successful_comments: number;
    message: string;
  };
}

/** 비디오 기반 스팸 분석: 비디오 ID 배열을 받아 해당 비디오들의 모든 댓글을 조회하여 AI 스팸 분석을 실행합니다. */
export const usePostVideosSpamAnalysis = () => {
  return useMutation<IPostVideosSpamAnalysisRes, AxiosError<IPostVideosSpamAnalysisRes>, IPostVideosSpamAnalysisReq>({
    mutationKey: ['postVideosSpamAnalysis'],
    mutationFn: async (params: IPostVideosSpamAnalysisReq) => {
      const { data } = await instance().post<IPostVideosSpamAnalysisRes>('/youtube/spam_analysis/videos/', params);

      if (!data) throw new Error('postVideosSpamAnalysis: Invalid server response');

      return data;
    }
  });
};
