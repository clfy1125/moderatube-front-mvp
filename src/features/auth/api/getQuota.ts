import { useQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';

interface IGetQuotaRes {
  // YouTube 할당량 데이터
  data: {
    current_quota: number;
    daily_quota_limit: number;
    remaining_quota: number;
    quota_percentage: number;
    is_quota_exceeded: boolean;
  };
}

/** Youtube 할당량 정보 조회: 현재 사용자의 YouTube API 할당량 정보를 조회 */
export const useGetQuota = () => {
  return useQuery<IGetQuotaRes, AxiosError<IGetQuotaRes>>({
    queryKey: ['getQuota'],
    queryFn: async () => {
      const { data } = await instance().get<IGetQuotaRes>('/auth/youtube/quota/');
      if (!data) throw new Error('getQuota: Invalid server response');

      return data;
    },
    enabled: false
  });
};
