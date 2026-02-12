import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

import { ECommentOption } from '../SelectCommentOption/enum';

import { EGetVideoCommentsSort } from './enum';

export interface IGetVideoCommentsReq {
  page: number;
  page_size: number;
  search: string;
  sort: EGetVideoCommentsSort; // published_at | like_count | author_display_name | new_started_at
  type: ECommentOption; // new, normal, spam, deleted
}

export interface IGetVideoCommentsRes extends IDefaultRes {
  metadata: {
    count: number;
    current_page: number;
    last_page: number;
    page_size: number;
    next: boolean;
    previous: boolean;
  };
  data: {
    id: number;
    comment_id: string;
    text_display: string;
    author_display_name: string;
    author_channel_id?: string;
    author_profile_image_url?: string;
    like_count?: number;
    published_at: string;
    updated_at: string;
    is_comment_thread?: boolean;
    comment_thread_id?: string;
    type?: ECommentOption;
    is_new?: boolean;
    new_started_at?: string;
    new_expired_at?: string;
    spam_reviewed?: boolean;
    spam_review_started_at?: string;
    spam_review_ended_at?: string;
    video: {
      video_id: string;
      title: string;
      youtube_url: string;
    };
    channel: {
      id: number;
      channel_id: string;
      channel_title?: string;
      description?: string;
      thumbnail_url?: string;
      subscriber_count?: number;
      view_count?: number;
      video_count?: number;
      is_verified?: boolean;
      privacy_status?: 'public' | 'unlisted' | 'private' | 'no_channel' | 'error';
      created_at: string;
      updated_at: string;
    };
  }[];
}

/** 특정 비디오의 댓글 목록 조회: 특정 YouTube 비디오의 댓글 목록을 조회합니다.
 * @path video_id: string
 * @query params: IGetVideoCommentsReq
 */
export const useGetVideoComments = (video_id: string) => {
  return useMutation<IGetVideoCommentsRes, AxiosError<IGetVideoCommentsRes>, IGetVideoCommentsReq>({
    mutationKey: ['getVideoComments'],
    mutationFn: async (params: IGetVideoCommentsReq) => {
      const { data } = await instance().request({ method: 'GET', url: `/youtube/videos/${video_id}/comments/`, params: params }); // <IGetVideosRes>('/youtube/videos/', params);

      if (!data) throw new Error('getVideoComments: Invalid server response');

      return data;
    }
  });
};
