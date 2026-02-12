import { useQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IGetVideoReq {
  video_id: string;
}

export interface IGetVideoRes extends IDefaultRes {
  data: {
    video: {
      id: number;
      video_id: string;
      title: string;
      description?: string;
      thumbnail_url?: string;
      duration?: string;
      published_at: string;
      view_count?: number;
      like_count?: number;
      comment_count?: number;
      engagement_rate: number;
      youtube_url: string;
      is_new?: boolean;
      new_started_at?: string;
      new_expired_at?: string;
      is_synced?: boolean;
      last_synced_at: string;
      is_bookmarked?: boolean;
      bookmarked_at?: string;
      is_auto_deletion_reserved?: boolean;
      auto_deletion_at?: string;
      privacy_status: 'public' | 'unlisted' | 'private' | 'unknown';
      is_public: boolean;
      created_at: string;
      updated_at: string;
      channel: {
        id: number;
        channel_id: string;
        channel_title?: string;
        description?: string;
        custom_url?: string;
        thumbnail_url?: string;
        subscriber_count?: number;
        video_count?: number;
        view_count?: number;
        is_verified?: boolean;
        privacy_status?: 'public' | 'unlisted' | 'private' | 'unknown';
        created_at: string;
        updated_at: string;
      };
    };
    video_info: {
      video_id: string;
      title: string;
      description: string;
      published_at: string;
      view_count: number;
      like_count: number;
      comment_count: number;
      engagement_rate: number;
      youtube_url: string;
      is_public: boolean;
      is_bookmarked: boolean;
      is_auto_deletion_reserved: boolean;
      auto_deletion_at: string;
    };
    channel_info: {
      channel_id: string;
      channel_title: string;
      channel_description: string;
      subscriber_count: number;
      video_count: number;
      view_count: number;
      is_verified: boolean;
      thumbnail_url: string;
    };
    comment_stats: {
      total_comments: number;
      spam_comments_7days: number; // 7일간 스팸 댓글 수 (한국 시간 기준)
      reviewed_comments: number; // 검사된 댓글 수 (type이 new가 아닌 댓글)
      daily_spam_stats: {
        // 일별 스팸 댓글 통계
        date: string; // 2025-09-26
        spam_count: number;
      }[];
      period_info: {
        period_days: number;
        period_start: string; // 2025-09-23T00:00:00+09:00
        period_end: string; // 2025-09-30T10:32:54.761751+09:00
        timezone: string;
      };
    };
  };
}

/** 비디오 상세 조회: 특정 비디오의 상세 정보를 조회합니다. */
export const useGetVideo = (params: IGetVideoReq) => {
  return useQuery<IGetVideoRes, AxiosError<IGetVideoRes>>({
    queryKey: ['getVideo'],
    queryFn: async () => {
      const { data } = await instance().get<IGetVideoRes>(`/youtube/videos/${params.video_id}/`);

      if (!data) throw new Error('getVideo: Invalid server response');

      return data;
    },
    enabled: false
  });
};
