import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostChannelSyncReq {
  channelId: string;
}

export interface IPostChannelSyncRes extends IDefaultRes {
  data: {
    message: string;
    total_videos: number;
    new_videos: number;
    updated_videos: number;
    quota_used: number;
    quota_remaining: number;
  };
}

/** 특정 채널 비디오 동기화: 지정된 채널 ID의 비디오를 조회하고 동기화합니다. */
export const usePostChannelSync = () => {
  return useMutation<IPostChannelSyncRes, AxiosError<IPostChannelSyncRes>, IPostChannelSyncReq>({
    mutationKey: ['postChannelSync'],
    mutationFn: async (params: IPostChannelSyncReq) => {
      const { data } = await instance().post<IPostChannelSyncRes>(`/youtube/channels/${params.channelId}/sync/`);

      if (!data) throw new Error('postChannelSync: Invalid server response');

      return data;
    }
  });
};
