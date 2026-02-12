import { useQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IGetSubscriptionHistoryRes extends IDefaultRes {
  data: {
    id: number;
    /*  created - 생성 | activated - 활성화 | extended - 연장 | cancelled - 취소 | expired - 만료 | renewed - 갱신 | plan_changed - 계획 변경 */
    action: 'created' | 'activated' | 'extended' | 'cancelled' | 'expired' | 'renewed' | 'plan_changed';
    created_at: string;
    old_plan?: string;
    new_plan?: string;
    old_expired_at?: string;
    new_expired_at?: string;
    amount?: string;
    currency?: string;
    notes?: string;
  }[];
}

/** 구독 이력 조회: 사용자의 구독 변경 이력을 조회합니다. */
export const useGetSubscription = () => {
  return useQuery<IGetSubscriptionHistoryRes, AxiosError<IGetSubscriptionHistoryRes>>({
    queryKey: ['getSubscriptionHistory'],
    queryFn: async () => {
      const { data } = await instance().get<IGetSubscriptionHistoryRes>('/accounts/subscription/history/');

      if (!data) throw new Error('getSubscriptionHistory: Invalid server response');

      return data;
    },
    enabled: false
  });
};
