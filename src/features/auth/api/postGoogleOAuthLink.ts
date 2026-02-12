import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostGoogleOAuthLinkReq {
  code: string;
}

export interface IPostGoogleOAuthLinkRes extends IDefaultRes {
  data: {
    message: string;
    youtube_account: {
      id: number;
      default_channel_id: string;
      default_channel_title: string;
      is_active: boolean;
      has_channel: boolean;
      created_at: string;
      updated_at: string;
    };
  };
}

const DEV_REDIRECT_URL = import.meta.env.VITE_LOCAL;
const PROD_REDIRECT_URL = import.meta.env.VITE_DEPLOY;

/** Youtube 계정 연결: 기존 사용자 계정에 YouTube 계정을 연결합니다. 연결된 YouTube 계정 정보를 반환합니다. 
  시스템 내 User와 YoutubeAccount는 별도의 계정입니다. User는 YoutubeAccount를 가질 수 있으며, 회원가입 시 자동으로 연동합니다.
  이후, 연동 계정을 바꾸기 위해서는 회원 가입과 동일한 callback을 수행하고 code를 얻습니다. /api/auth/google/link에 code를 전달하여 다른 계정에 연동할 수 있습니다.
*/
export const usePostGoogleOAuthLink = () => {
  return useMutation<IPostGoogleOAuthLinkRes, AxiosError<IPostGoogleOAuthLinkRes>, IPostGoogleOAuthLinkReq>({
    mutationKey: ['postGoogleOAuthLink'],
    mutationFn: async (params: IPostGoogleOAuthLinkReq) => {
      const URL = import.meta.env.MODE === 'development' ? DEV_REDIRECT_URL : PROD_REDIRECT_URL;

      const { data } = await instance().post<IPostGoogleOAuthLinkRes>(`/auth/google/link/?redirect_url=${URL}/auth/link`, params);

      if (!data) throw new Error('postGoogleOAuthLink: Invalid server response');

      return data;
    }
  });
};
