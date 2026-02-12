import { useQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

interface IGetReportsMyReq {
  page: number;
  page_size: number;
  report_type: 'false_positive' | 'false-negative';
  status: 'pending' | 'accepted' | 'rejected';
}

interface IGetReportsMyRes extends IDefaultRes {
  data: {
    id: number;
    terms_of_services?: string;
    privacy_policy?: string;
    created_at: string;
    updated_at: string;
  };
}

/** 내 스팸 리포트 목록 조회: 내가 작성한 스팸 진단 오류 리포트 목록을 조회합니다. */
export const useGetReportsMy = (params: IGetReportsMyReq) => {
  return useQuery<IGetReportsMyRes, AxiosError<IGetReportsMyRes>>({
    queryKey: ['getReportsMy'],
    queryFn: async () => {
      const { data } = await instance().get<IGetReportsMyRes>('/youtube/reports/my/', { params });

      if (!data) throw new Error('getReportsMy: Invalid server response');

      return data;
    }
  });
};
