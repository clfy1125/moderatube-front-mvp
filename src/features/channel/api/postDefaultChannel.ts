import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostDefaultChannelReq {
  channel_id: string;
}

export interface IPostDefaultChannelRes {
  /* ... */
}

/** 기본 채널 설정: 현재 사용자의 기본 YouTube 채널을 설정합니다. */
export const usePostDefaultChannel = () => {
  return useMutation<IDefaultRes, AxiosError<IDefaultRes>, IPostDefaultChannelReq>({
    mutationKey: ['postDefaultChannel'],
    mutationFn: async (params: IPostDefaultChannelReq) => {
      const { data } = await instance().post<IDefaultRes>('/accounts/default-channel/', params);

      if (!data) throw new Error('postDefaultChannel: Invalid server response');

      return data;
    }
  });
};
