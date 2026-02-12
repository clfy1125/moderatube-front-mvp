import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';

import { ECommentOption } from '../SelectCommentOption/enum';

import { EGetVideoCommentsSort } from './enum';

export interface IGetNewestCommentsReq {
  channelId: string;
  page: number;
  page_size: number;
  search?: string;
  sort?: EGetVideoCommentsSort; // published_at | like_count | author_display_name | new_started_at
  // type?: ECommentOption; // new, normal, spam, deleted
  // videoId?: string;
}

interface IGetNewestCommentsRes {
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
      custom_url?: string;
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

/** 신규 Youtube 댓글 목록 조회: is_new=True인 신규 YouTube 댓글 목록을 조회 */
export const useGetNewestComments = () => {
  return useMutation<IGetNewestCommentsRes, AxiosError<IGetNewestCommentsRes>, IGetNewestCommentsReq>({
    mutationKey: ['getNewestComments'],
    mutationFn: async (params: IGetNewestCommentsReq) => {
      const { data } = await instance().get<IGetNewestCommentsRes>('/youtube/comments/newest/', { params });
      if (!data) throw new Error('getNewestComments: Invalid server response');

      return data;
    }
  });
};
