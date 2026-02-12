import { useQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IGetSubscriptionRes extends IDefaultRes {
  data: {
    id: number;
    expired_at: string;
    is_active: boolean;
    is_expired: boolean;
    days_remaining: number;
    created_at: string;
    updated_at: string;
    plan?: 'basic' | 'premium' | 'enterprise';
    status?: 'active' | 'expired' | 'cancelled' | 'pending';
    started_at?: string;
    price?: string;
    currency?: string;
    auto_renewal?: boolean;
    payment_method?: string;
  };
}

/** 구독 정보 조회: 사용자의 현재 구독 정보를 조회합니다. */
export const useGetSubscription = () => {
  return useQuery<IGetSubscriptionRes, AxiosError<IGetSubscriptionRes>>({
    queryKey: ['getSubscription'],
    queryFn: async () => {
      const { data } = await instance().get<IGetSubscriptionRes>('/accounts/subscription/');

      if (!data) throw new Error('getSubscription: Invalid server response');

      return data;
    },
    enabled: false
  });
};
