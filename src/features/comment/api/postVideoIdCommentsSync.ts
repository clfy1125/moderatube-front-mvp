import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostVideoCommentsRes extends IDefaultRes {
  data: {
    message: string;
    total_comments: number;
    new_comments: number;
    updated_comments: number;
    quota_used: number;
    quota_remaining: number;
  };
}
/** 특정 비디오의 댓글 동기화: 특정 YouTube 비디오의 댓글을 수집하여 데이터베이스에 저장
 * @path video_id: string
 */
export const usePostVideoIdCommentsSync = (video_id: string) => {
  return useMutation<IPostVideoCommentsRes, AxiosError<IPostVideoCommentsRes>>({
    mutationKey: ['postVideoIdCommentsSync', video_id],
    mutationFn: async () => {
      const { data } = await instance().post<IPostVideoCommentsRes>(`/youtube/videos/${video_id}/comments/sync/`);

      if (!data) throw new Error('postVideoIdCommentsSync: Invalid server response');

      return data;
    }
  });
};
