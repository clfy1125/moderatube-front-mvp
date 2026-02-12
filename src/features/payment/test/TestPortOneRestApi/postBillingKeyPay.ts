import { IssueBillingKeyRequest, IssueBillingKeyResponse } from '@portone/browser-sdk/v2';
import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from './instance';

export type IPostBillingKeyPayReq = {
  paymentId: string;
  param: IssueBillingKeyRequest;
};
export type IPostBillingKeyPayRes = IssueBillingKeyResponse;

/* 빌링키 단건 결제요청 */
export const usePostBillingKeyPay = () => {
  return useMutation<IPostBillingKeyPayRes, AxiosError<IPostBillingKeyPayRes>, IPostBillingKeyPayReq>({
    mutationKey: ['postBillingKeyPay'],
    mutationFn: async (params: IPostBillingKeyPayReq) => {
      const { data } = await instance.post(`/payments/${params.paymentId}/billing-key`, params.param);

      if (!data) throw new Error('postBillingKeyPay: Invalid server response');

      return data;
    }
  });
};
