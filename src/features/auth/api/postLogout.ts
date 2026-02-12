import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostLogoutReq {
  refresh: string;
}

/** Google OAuth 인증 후 콜백을 처리합니다. [POST 요청] JWT 토큰을 발급합니다. */
export const usePostLogout = () => {
  return useMutation<IDefaultRes, AxiosError<IDefaultRes>, IPostLogoutReq>({
    mutationKey: ['postLogout'],
    mutationFn: async (params: IPostLogoutReq) => {
      const { data } = await instance().post<IDefaultRes>('/auth/logout/', params);

      if (!data) throw new Error('postLogout: Invalid server response');

      return data;
    }
  });
};
