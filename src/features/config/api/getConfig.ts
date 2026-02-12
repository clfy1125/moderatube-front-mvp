import { useQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

interface IGetBoardConfigRes extends IDefaultRes {
  data: {
    id: number;
    terms_of_services?: string;
    privacy_policy?: string;
    created_at: string;
    updated_at: string;
  };
}

/** 시스템 설정 조회 (Public): 시스템 설정(이용약관, 개인정보처리방침)을 조회합니다. 인증이 필요하지 않습니다. */
export const useGetBoardConfig = () => {
  return useQuery<IGetBoardConfigRes, AxiosError<IGetBoardConfigRes>>({
    queryKey: ['getBoardConfig'],
    queryFn: async () => {
      const { data } = await instance().get<IGetBoardConfigRes>('/board/config/');

      if (!data) throw new Error('getBoardConfig: Invalid server response');

      return data;
    },
    enabled: false
  });
};
