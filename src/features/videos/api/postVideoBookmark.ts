import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostVideoBookmarkReq {
  video_id: string;
}

export interface IPostVideoBookmarkRes extends IDefaultRes {
  data: {
    video_id: string;
    is_bookmarked: boolean;
    bookmarked_at?: string;
  };
}

/** 비디오 북마크 토글: 특정 YouTube 비디오의 북마크 상태를 토글합니다. */
export const usePostVideoBookmark = () => {
  return useMutation<IPostVideoBookmarkRes, AxiosError<IPostVideoBookmarkRes>, IPostVideoBookmarkReq>({
    mutationKey: ['postVideoBookmark'],
    mutationFn: async (params: IPostVideoBookmarkReq) => {
      const { data } = await instance().post<IPostVideoBookmarkRes>(`/youtube/videos/${params.video_id}/bookmark/`);

      if (!data) throw new Error('postVideoBookmark: Invalid server response');

      return data;
    }
  });
};
