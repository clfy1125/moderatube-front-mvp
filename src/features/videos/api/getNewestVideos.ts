import { useQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

import { EVideoOption } from '../SelectVideoOption/enum';

const DUMMY_NEWEST_VIDEOS = [
  {
    name: '영상 제목입니다. 영상 제목이에요 영상제목제목제목입니다. 영상 제목이에요 영상제목제목영상 제목입니다. 영상 제목이에요 영상제목제목',
    writer: 'apple01apple01apple01apple01',
    content: '정말 유익한 영상이네요. 감사합니다. 영상제목 띄어쓰기 포함 최대 20글자정말 유익한 영상이네요. 감사합니다. 영상제목 띄어쓰기 포함 최대 20글자정말 유익한 영상이네요. 감사합니다. 영상제목 띄어쓰기 포함 최대 20글자',
    date: '25.02.11',
    likes: 1234,
    state: '정상',
    videoId: '65j33w465j33w465j33w465j33w4',
    channelId: 'c',
    url: '11234'
  },
  {
    name: '영상 제목2',
    writer: 'apple022222222',
    content: '정말 유익한 영상이네요. 감사합니다.',
    date: '25.02.11',
    likes: 0,
    state: '미분류',
    videoId: '5e6w45',
    channelId: 'd',
    url: '12234'
  },
  {
    name: '영상 제목3',
    writer: 'wht65h4wq3',
    content: '댓글 내용이 깁니다. 댓글 내용이 깁니다.',
    date: '25.02.11',
    likes: 999,
    state: '스팸',
    videoId: '8674w3s',
    channelId: 'c',
    url: '13234'
  },
  {
    name: '영상 제목4',
    writer: 'j65343w3w4',
    content: '정말 유익한 영상이네요. 감사합니다.',
    date: '25.02.11',
    likes: 468751,
    state: '미분류',
    videoId: '85643w',
    channelId: 'b',
    url: '14234'
  },
  {
    name: '영상 제목5',
    content: '정말 유익한 영상이네요. 감사합니다.',
    date: '25.02.11',
    likes: 3500,
    writer: 'aaa56356ag34qgw34h',
    state: '미분류',
    videoId: 'dsfg4',
    channelId: 'a',
    url: '15234'
  }
];

type ENewestVideoSort = EVideoOption | 'new_started_at';

export interface IGetNewestVideosReq {
  page: number;
  page_size: number;
  search: string;
  sort: ENewestVideoSort; // published_at | view_count | like_count | new_started_at
}

export interface IGetNewestVideosRes extends IDefaultRes {
  data: {
    count: number;
    next: string;
    previous: string;
    results: {
      id: number;
      video_id: string; // Youtube 비디오 ID
      title: string; // 비디오 제목
      published_at: string; // 업로드 날짜
      engagement_rate: number; // 참여율
      youtube_url: string;
      last_synced_at: string; // 마지막 동기화
      created_at: string; // 생성일
      updated_at: string; // 수정일
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

      description?: string; // 비디오 설명
      thumbnail_url?: string; // 썸네일 URL
      duration?: string; // 재생 시간
      view_count?: number; // 조회수
      like_count?: number; // 좋아요 수
      comment_count?: number; // 댓글 수
      is_new?: boolean; // 신규 비디오 여부
      new_started_at?: string; // 신규 비디오 시작 시간
      new_expired_at?: string; // 신규 비디오 만료 시간
      is_synced?: boolean; // 동기화 완료
    }[];
  };
}

/** 신규 Youtube 비디오 목록 조회: is_new=True인 신규 YouTube 비디오 목록을 조회 */
export const useGetNewestVideos = (params: IGetNewestVideosReq) => {
  return useQuery<IGetNewestVideosRes, AxiosError<IGetNewestVideosRes>>({
    queryKey: ['getNewestVideos'],
    queryFn: async () => {
      const { data } = await instance().get<IGetNewestVideosRes>('/youtube/videos/newest/', { params });

      if (!data) throw new Error('getNewestVideos: Invalid server response');

      return data;
    },
    enabled: false
  });
};
