<script setup lang="ts">
import FirstPageBtn from './FirstPageBtn/index.vue';
import LastPageBtn from './LastPageBtn/index.vue';
import NextPageBtn from './NextPageBtn/index.vue';
import NumberList from './NumberList/index.vue';
import PrevPageBtn from './PrevPageBtn/index.vue';

interface IPaginationProps {
  /* 선택한 페이지 */
  currentPage: number;
  /** 총 카운트 */
  total: number;
  /** 첫 페이지 버튼 */
  showFirstPageBtn?: boolean;
  /** 이전 버튼 */
  showPrevPageBtn?: boolean;
  /** 다음 버튼 */
  showNextPageBtn?: boolean;
  /** 끝 페이지 버튼 */
  showLastPageBtn?: boolean;

  /** 현재 선택한 페이지 양옆 노출 갯수  */
  siblingCount?: number;
  /** 시작페이지와 끝페이지 주변의 노출 갯수 */
  boundaryCount?: number;

  /** 비활성화 여부 */
  disabled?: boolean;
}
withDefaults(defineProps<IPaginationProps>(), {
  showFirstPageBtn: true,
  showPrevPageBtn: true,
  showNextPageBtn: true,
  showLastPageBtn: true,
  siblingCount: 1,
  boundaryCount: 2,
  disabled: false
});
const emit = defineEmits<{ (e: 'on-select-page', value: number): void }>();
defineOptions({ name: 'BasePagination' });

const changePage = (page: number) => emit('on-select-page', page);
</script>

<!-- 필요한 것들: 현재 페이지, 전체페이지 -->
<template>
  <nav class="pagination">
    <ul>
      <FirstPageBtn :disabled="disabled || currentPage === 1" :to-first="() => changePage(1)" />
      <PrevPageBtn :disabled="disabled || currentPage === 1" :to-prev="() => changePage(currentPage - 1)" />
      <NumberList :total="total" :selected-page="currentPage" :sibling-count="siblingCount" :boundary-count="boundaryCount" :change-page="changePage" />
      <NextPageBtn :disabled="disabled || currentPage === total" :to-next="() => changePage(currentPage + 1)" />
      <LastPageBtn :disabled="disabled || currentPage === total" :to-last="() => changePage(total)" />
    </ul>
  </nav>
</template>

<style lang="scss">
.pagination {
  ul {
    display: flex;

    li {
      height: 16px;
      list-style-type: none;

      button {
        width: 16px;
        height: 16px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        background-color: transparent;
        cursor: pointer;

        &:disabled {
          cursor: default;
        }
      }
    }
  }
}
</style>
