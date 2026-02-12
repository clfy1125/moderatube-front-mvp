import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostSubscriptionStartReq {
  card_id: number;
  plan_id: number;
}

export interface IPostSubscriptionStartRes extends IDefaultRes {
  data: {
    id: number;
    plan?: 'basic';
    status?: 'none' | 'active' | 'expired' | 'cancelled' | 'pending';
    started_at?: string;
    expired_at: string;
    price?: string;
    currency?: string;
    card_info: {
      // ...
    };
    is_active: boolean;
    is_expired: boolean;
    days_remaining: number;
    created_at: string;
    updated_at: string;
  };
}

/** 구독시작: 새로운 구독을 시작합니다. 카드와 연결하여 결제를 실행합니다. */
export const usePostSubscriptionStart = () => {
  return useMutation<IPostSubscriptionStartRes, AxiosError<IPostSubscriptionStartRes>, IPostSubscriptionStartReq>({
    mutationKey: ['postSubscriptionStart'],
    mutationFn: async (params: IPostSubscriptionStartReq) => {
      const { data } = await instance().request({ method: 'POST', url: '/accounts/subscription/start/', params });

      if (!data) throw new Error('postSubscriptionStart: Invalid server response');

      return data;
    }
  });
};
