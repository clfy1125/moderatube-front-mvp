import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';

import { ECommentOption } from '../SelectCommentOption/enum';

interface IGetCommentsReq {
  channel_id?: string;
  is_bookmarked?: boolean;
  page: number;
  page_size: number;
  search?: string;
  spam_reviewed?: boolean; // 스팸 검토 완료 여부 필터
  type?: ECommentOption;
  video_id?: string;
}

interface IGetCommentsRes {
  data: {
    comments: {
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
      spam_reviewed: boolean;
      spam_review_started_at?: string;
      spam_review_ended_at?: string;
      spam_review_result: string; // 'clean' | 그 외 정보 모름
      spam_review_result_detail: string;
      spam_index: number;
      spam_analyze_request: null;
      video: {
        video_id: string;
        title: string;
        youtube_url: string;
      };
      channel: {
        channel_id: string;
        channel_title: string;
      };
    }[];
    pagination: {
      current_page: number;
      page_size: number;
      total_count: number;
      total_pages: number;
      has_next: boolean;
      has_previous: boolean;
    };
    channel_info: {
      channel_id: string;
      channel_title: string;
      channel_description: string;
      subscriber_count: number;
      video_count: number;
      view_count: number;
    };
    filters: {
      video_id?: string;
      search: string;
    };
  };
}

/** 사용자의 모든 YouTube 댓글을 조회 */
export const useGetComments = () => {
  return useMutation<IGetCommentsRes, AxiosError<IGetCommentsRes>, IGetCommentsReq>({
    mutationKey: ['getComments'],
    mutationFn: async (params: IGetCommentsReq) => {
      const { data } = await instance().request({ method: 'GET', url: '/youtube/comments/', params: params });
      if (!data) throw new Error('getComments: Invalid server response');

      return data;
    }
  });
};
