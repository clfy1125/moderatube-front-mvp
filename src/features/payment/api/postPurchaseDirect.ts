import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostPurchaseDirectReq {
  product_id: number;
  values: {
    card_number: string; // minLength: 1, maxLength: 20
    expiry_year: string; // minLength: 1, maxLength: 4
    expiry_month: string; // minLength: 1, maxLength: 2
    card_password: string; // minLength: 1, maxLength: 2
    customer_identity_number: string; // minLength: 1, maxLength: 14 (생년월일 6자리 또는 사업자등록번호 10자리)
    customer_name: string; // minLength: 1, maxLength: 100
    customer_email: string; // minLength: 1
    customer_phone: string; // minLength: 1, maxLength: 20
  };
}

export interface IPostPurchaseRes extends IDefaultRes {
  data: {
    // ...
  };
}

/** 직접 카드 입력으로 상품 구매: 카드 정보를 직접 입력하여 상품을 구매합니다. */
export const usePostPurchaseDirect = () => {
  return useMutation<IPostPurchaseRes, AxiosError<IPostPurchaseRes>, IPostPurchaseDirectReq>({
    mutationKey: ['postPurchaseDirect'],
    mutationFn: async (params: IPostPurchaseDirectReq) => {
      const { data } = await instance().post<IPostPurchaseRes>(`/accounts/payments/products/${params.product_id}/purchase-direct/`, { params: params.values });

      if (!data) throw new Error('postPurchaseDirect: Invalid server response');

      return data;
    }
  });
};
