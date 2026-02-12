import { IssueBillingKeyRequest, IssueBillingKeyResponse } from '@portone/browser-sdk/v2';
import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from './instance';

export type IPostIssueBillingKeyReq = IssueBillingKeyRequest;
export type IPostIssueBillingKeyRes = IssueBillingKeyResponse;

/* 빌링키 발급 요청 */
export const usePostIssueBillingKey = () => {
  return useMutation<IPostIssueBillingKeyRes, AxiosError<IPostIssueBillingKeyRes>, IPostIssueBillingKeyReq>({
    mutationKey: ['postIssueBillingKey'],
    mutationFn: async (params: IPostIssueBillingKeyReq) => {
      const { data } = await instance.post('/billing-keys', params);

      if (!data) throw new Error('postIssueBillingKey: Invalid server response');

      return data;
    }
  });
};
