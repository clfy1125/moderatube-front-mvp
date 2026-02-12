import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

// false_positive: 정상 댓글을 스팸으로 잘못 분류(=스팸이 아닌거같음), false_negative: 스팸 댓글을 정상으로 잘못 분류(=스팸으로보임)
export interface IPostReporstReq {
  comment_id: string;
  report_type: 'false_positive' | 'false_negative';
  content: string;
}

export interface IPostReporstRes extends IDefaultRes {
  message: number;
  data: {
    report_id: number;
    comment_id: string;
    report_type: 'false_negative' | 'false_positive';
    description: string;
    status: string; // 'pending';
    created_at: string;
    message: string;
  };
}

/** 스팸 진단 오류 리포트 생성 */
export const usePostReports = () => {
  return useMutation<IPostReporstRes, AxiosError<IPostReporstRes>, IPostReporstReq>({
    mutationKey: ['postReports'],
    mutationFn: async (params: IPostReporstReq) => {
      const { data } = await instance().post<IPostReporstRes>('/youtube/reports/', params);

      if (!data) throw new Error('postReports: Invalid server response');

      return data;
    }
  });
};
