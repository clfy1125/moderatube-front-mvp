import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostPurchaseReq {
  product_id: number;
  card_id: number;
}

export interface IPostPurchaseRes extends IDefaultRes {
  data: {
    // ...
  };
}

/** 결제 상품 구매: 선택한 결제 상품을 "빌링키"로 구매합니다. */
export const usePostPurchase = () => {
  return useMutation<IPostPurchaseRes, AxiosError<IPostPurchaseRes>, IPostPurchaseReq>({
    mutationKey: ['postPurchase'],
    mutationFn: async (params: IPostPurchaseReq) => {
      const { data } = await instance().post<IPostPurchaseRes>(`/accounts/payments/products/${params.product_id}/purchase/`, { params: { card_id: params.card_id } });

      if (!data) throw new Error('postPurchase: Invalid server response');

      return data;
    }
  });
};
