import { useQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';
// import { isDummy } from '@/shared/utils/isDummy';

/* Dummy타입 */
export type DummyChannelItem = {
  id: string;
  name: string;
};

export interface IGetChannelsRes extends IDefaultRes {
  data: {
    default_channel_id: string;
    total_channels: number;
    channels: {
      account_id: number;
      channel_id: string;
      channel_title: string;
      channel_description: string;
      subscriber_count: number;
      video_count: number;
      view_count: number;
      is_default: boolean;
      last_synced_at: string;
    }[];
  };
}

// const DummyGetChannels = async (): Promise<IGetChannelsRes> => {
//   await new Promise((resolve) => setTimeout(resolve, 200)); // 0.2초 지연 시켜보기

//   return {
//     success: true,
//     data: [{ id: 1, channel_id: 'aaa', created_at: '2025-09-10T07:58:15.099Z', updated_at: '2025-09-10T07:58:15.099Z' }]
//   };
// };

/* 내 채널 목록 조회 :현재 사용자의 YouTube 채널 목록을 조회합니다. */
export const useGetChannels = () => {
  return useQuery<IGetChannelsRes, AxiosError<IGetChannelsRes>>({
    queryKey: ['getChannels'],
    queryFn: async () => {
      // if (isDummy) return await DummyGetChannels();
      const { data } = await instance().get<IGetChannelsRes>('/youtube/channels/');

      if (!data || !data.data) throw new Error('getChannels: Invalid server response');

      return data;
    },
    enabled: false
  });
};
