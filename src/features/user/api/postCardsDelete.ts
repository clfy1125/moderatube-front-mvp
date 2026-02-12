import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostCardsDeleteReq {
  card_id: number;
}

export interface IPostCardsDeleteRes extends IDefaultRes {
  data: {
    // ...
  };
}

/** 카드 삭제: 등록된 카드를 삭제합니다. Portone billingKey도 함께 삭제됩니다. */
export const usePostCardsDelete = () => {
  return useMutation<IPostCardsDeleteRes, AxiosError<IPostCardsDeleteRes>, IPostCardsDeleteReq>({
    mutationKey: ['postCardsDelete'],
    mutationFn: async (params: IPostCardsDeleteReq) => {
      const { data } = await instance().request({ method: 'DELETE', url: `/accounts/cards/${params.card_id}/` });

      if (!data) throw new Error('postCardsDelete: Invalid server response');

      return data;
    }
  });
};
