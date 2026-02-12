import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

import { EVideoOption } from '../SelectVideoOption/enum';

export interface IGetVideosReq {
  channel_id: string;
  is_bookmarked?: boolean;
  page: number; // 기본값 1
  page_size: number; // 기본값 20, 최대 100
  search: string;
  sort: EVideoOption;
}

export interface IGetVideosRes extends IDefaultRes {
  data: {
    videos: {
      id: number;
      video_id: string;
      title: string;
      description: string;
      thumbnail_url?: string;
      duration: string;
      published_at: string;
      view_count?: number;
      like_count?: number;
      comment_count: number;
      engagement_rate: number;
      youtube_url: string;
      is_new?: boolean;
      new_started_at?: string;
      new_expired_at?: string;
      is_synced: boolean;
      last_synced_at: string;
      privacy_status?: 'public' | 'unlisted' | 'private' | 'no_channel' | 'error';
      is_public: boolean;
      reviewed_comments: number;
      is_bookmarked: boolean;
      spam_review_count: number;
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
      channel_title?: string;
      channel_description?: string;
      subscriber_count: number;
      video_count: number;
      view_count: number;
    };
  };
}

/** Youtube 비디오 목록 조회: 사용자의 YouTube 계정에 연결된 채널의 비디오 목록을 조회합니다. */
export const useGetVideos = () => {
  return useMutation<IGetVideosRes, AxiosError<IGetVideosRes>, IGetVideosReq>({
    mutationKey: ['getVideos'],
    mutationFn: async (params: IGetVideosReq) => {
      const { data } = await instance().request({ method: 'GET', url: '/youtube/videos/', params: params });

      if (!data) throw new Error('getVideos: Invalid server response');

      return data;
    }
  });
};
