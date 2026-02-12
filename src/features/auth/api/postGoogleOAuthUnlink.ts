import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostGoogleOAuthUnlinkReq {
  youtube_account_id: number;
}

export interface IPostGoogleOAuthUnlinkRes extends IDefaultRes {
  data: {
    message: string;
    youtube_account_id: number;
    channel_title: string;
  };
}

/** 구글 계정 연결 해제: 현재 사용자의 특정 YouTube 계정 연결을 해제합니다. */
export const usePostGoogleOAuthUnlink = () => {
  return useMutation<IPostGoogleOAuthUnlinkRes, AxiosError<IPostGoogleOAuthUnlinkRes>, IPostGoogleOAuthUnlinkReq>({
    mutationKey: ['postGoogleOAuthUnlink'],
    mutationFn: async (params: IPostGoogleOAuthUnlinkReq) => {
      const { data } = await instance().post<IPostGoogleOAuthUnlinkRes>('/auth/google/unlink/', params);

      if (!data) throw new Error('postGoogleOAuthUnlink: Invalid server response');

      return data;
    }
  });
};
