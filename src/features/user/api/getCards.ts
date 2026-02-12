import { useQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IGetCardsRes extends IDefaultRes {
  data: {
    id: number;
    publisher: string;
    issuer: string;
    brand: string;
    type: string;
    owner_type: string;
    bin: string;
    name: string;
    number: string;
    owner?: string;
    is_active?: boolean;
    created_at: string;
    updated_at: string;
  }[];
}

/** 카드 목록 조회: 사용자의 등록된 카드 목록을 조회합니다. */
export const useGetCards = () => {
  return useQuery<IGetCardsRes, AxiosError<IGetCardsRes>>({
    queryKey: ['getCards'],
    queryFn: async () => {
      const { data } = await instance().get<IGetCardsRes>('/accounts/cards/');

      if (!data) throw new Error('getCards: Invalid server response');

      return data;
    },
    enabled: false
  });
};
