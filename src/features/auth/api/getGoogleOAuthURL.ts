import { useQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IGetGoogleOAuthURLReq {
  redirect_url: string;
}

export interface IGetGoogleOAuthURLRes extends IDefaultRes {
  data: {
    auth_url: string;
  };
}

/** Google OAuth 인증 URL: Google OAuth 인증을 위한 URL을 반환합니다. 쿼리스트링으로 redirect_url을 설정할 수 있습니다 */
export const useGetGoogleOAuthURL = (params: IGetGoogleOAuthURLReq) => {
  return useQuery<IGetGoogleOAuthURLRes, AxiosError<IGetGoogleOAuthURLRes>>({
    queryKey: ['getGoogleOAuthUrl'],
    queryFn: async () => {
      const { data } = await instance().get<IGetGoogleOAuthURLRes>('/auth/google/auth-url/', { params });
      if (!data) throw new Error('getGoogleOAuthUrl: Invalid server response');

      return data;
    },
    enabled: false
  });
};
