import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostCardsCreateReq {
  billing_key: string;
  full_name: string;
  email: string;
  phone_number: string;
}

export interface IPostCardsCreateRes extends IDefaultRes {
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
    owner: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
}

/** 카드 등록: 새로운 카드를 등록합니다. Portone billingKey 조회를 통해 카드 정보를 가져옵니다. */
export const usePostCardsCreate = () => {
  return useMutation<IPostCardsCreateRes, AxiosError<IPostCardsCreateRes>, IPostCardsCreateReq>({
    mutationKey: ['postCardsCreate'],
    mutationFn: async (params: IPostCardsCreateReq) => {
      const { data } = await instance().request({ method: 'POST', url: '/accounts/cards/create/', params });

      if (!data) throw new Error('postCardsCreate: Invalid server response');

      return data;
    }
  });
};
