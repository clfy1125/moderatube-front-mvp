import { ref } from 'vue';

import { defineStore } from 'pinia';

import { EVideoOption } from '@/features/videos/SelectVideoOption/enum';

/** (채널 관리 페이지) 의 비디오 리스트 요청 파라미터 저장 */
export const useVideosQueryParamsStore = defineStore('videosQueryParams', () => {
  const page = ref<number>(1);
  const page_size = ref<number>(10);
  const search = ref<string>('');
  const sort = ref<EVideoOption>(EVideoOption.published_at);
  const is_bookmarked = ref<boolean | undefined>(false);

  const changeText = (newText: string) => {
    search.value = newText;
    page.value = 1; // 검색어 바뀌면 페이지 초기화
  };

  const changePage = (newPage: number) => {
    page.value = newPage;
  };

  const changeSort = (option: { sort: EVideoOption; is_bookmarked?: boolean }) => {
    sort.value = option.sort;
    is_bookmarked.value = option.is_bookmarked;

    page.value = 1; // 정렬옵션 바뀌면 페이지 초기화
  };

  const resetVideosQueryParams = () => {
    search.value = '';
    page.value = 1;
    sort.value = EVideoOption.published_at;
  };

  return {
    page,
    page_size,
    search,
    sort,
    is_bookmarked,
    changeText,
    changePage,
    changeSort,
    resetVideosQueryParams
  };
});
