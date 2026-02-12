import { useQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';

interface IGetSubscriptionProductsRes {
  data: {
    product_id: number;
    name: string;
    description: string;
    credits: number;
    price: number;
    currency: string;
    trigger: string;
    trigger_desction: string;
    sort_order: number;
  }[];
}

/** 구독 상품 목록 조회: 구매 가능한 구독 상품 목록을 조회합니다. */
export const useGetSubscriptionProducts = () => {
  return useQuery<IGetSubscriptionProductsRes, AxiosError<IGetSubscriptionProductsRes>>({
    queryKey: ['getSubscriptionProducts'],
    queryFn: async () => {
      const { data } = await instance().request({ method: 'GET', url: '/accounts/payments/subscription-products/' });
      if (!data) throw new Error('getSubscriptionProducts: Invalid server response');

      return data;
    },
    enabled: false
  });
};
