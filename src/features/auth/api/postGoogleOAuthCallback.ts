import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostGoogleOAuthCallbackReq {
  code: string;
}

export interface IPostGoogleOAuthCallbackRes extends IDefaultRes {
  data: {
    refresh: string;
    access: string;
    user: {
      id: number;
      email?: string;
      first_name?: string;
      last_name?: string;
      date_joined: string; // 등록일
      profile: {
        id: number;
        user_email: string;
        user_first_name: string;
        user_last_name: string;
        nickname?: string;
        secondary_email?: string;
        google_social_id: string;
        is_google_linked: boolean; // 구글 계정 연결됨
        is_verified?: boolean; // 인증된 사용자
        created_at: string;
        updated_at: string;
        display_name: string;
        has_youtube_channel: boolean;
        has_active_subscription: boolean;
        subscription_status: string;
        subscription_plan: string;
        youtube_accounts: {
          id: number;
          default_channel_id: string;
          default_channel_title: string;
          is_active?: boolean; // 활성상태
          has_channel: boolean;
          created_at: string;
          updated_at: string;
        }[];
        agreement: {
          terms_of_usage: {
            agreed: boolean;
            agreed_at?: string;
          };
          privacy_policy: {
            agreed: boolean;
            agreed_at?: string;
          };
        };
      };
    };
  };
}

const DEV_REDIRECT_URL = import.meta.env.VITE_LOCAL;
const PROD_REDIRECT_URL = import.meta.env.VITE_DEPLOY;

/** Google OAuth 인증 후 콜백을 처리합니다. [POST 요청] JWT 토큰을 발급합니다. */
export const usePostGoogleOAuthCallback = () => {
  return useMutation<IPostGoogleOAuthCallbackRes, AxiosError<IPostGoogleOAuthCallbackRes>, IPostGoogleOAuthCallbackReq>({
    mutationKey: ['postGoogleOAuthCallback'],
    mutationFn: async (params: IPostGoogleOAuthCallbackReq) => {
      const URL = import.meta.env.MODE === 'development' ? DEV_REDIRECT_URL : PROD_REDIRECT_URL;

      const { data } = await instance().post<IPostGoogleOAuthCallbackRes>(`/auth/google/callback/?redirect_url=${URL}/auth/login`, params);

      if (!data) throw new Error('postGoogleOAuthCallback: Invalid server response');

      return data;
    }
  });
};
