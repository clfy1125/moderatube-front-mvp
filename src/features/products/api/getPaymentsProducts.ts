import { useQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';

interface IGetPaymentsProductsRes {
  data: {
    product_id: number;
    credits: number;
    price: number;
    currency: string;
  }[];
}

/** 결제상품 목록 조회: 구매 가능한 결제 상품 목록을 조회합니다. */
export const useGetPaymentsProducts = () => {
  return useQuery<IGetPaymentsProductsRes, AxiosError<IGetPaymentsProductsRes>>({
    queryKey: ['getPaymentsProducts'],
    queryFn: async () => {
      const { data } = await instance().request({ method: 'GET', url: '/accounts/payments/products/' });
      if (!data) throw new Error('getPaymentsProducts: Invalid server response');

      return data;
    },
    enabled: false
  });
};
