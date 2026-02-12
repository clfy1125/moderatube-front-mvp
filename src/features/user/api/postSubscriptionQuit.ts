import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostSubscriptionQuitReq {
  reason: string;
}

export interface IPostSubscriptionQuitRes extends IDefaultRes {
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

/** 구독 취소: 활성화된 구독을 취소합니다. Portone 예약결제 취소 API를 사용합니다. */
export const usePostSubscriptionQuit = () => {
  return useMutation<IPostSubscriptionQuitRes, AxiosError<IPostSubscriptionQuitRes>, IPostSubscriptionQuitReq>({
    mutationKey: ['postSubscriptionQuit'],
    mutationFn: async (params: IPostSubscriptionQuitReq) => {
      const { data } = await instance().request({ method: 'POST', url: '/accounts/subscription/quit/', params });

      if (!data) throw new Error('postSubscriptionQuit: Invalid server response');

      return data;
    }
  });
};
