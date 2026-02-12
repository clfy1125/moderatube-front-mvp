<script setup lang="ts">
import PageBtn from '../PageBtn/index.vue';

type PageType = number | 'DOTS';

interface INumberListProps {
  total: number;
  selectedPage: number;
  siblingCount: number;
  boundaryCount: number;
  changePage: (val: number) => void;
}
const props = defineProps<INumberListProps>();
defineOptions({ name: 'NumberList' });

const getPages = (): PageType[] => {
  const totalPageNumbers = props.siblingCount * 2 + props.boundaryCount * 2 + 3;
  // ㉠ props total이 sibling과 boundary 처리를 위한 계산총합보다 낮은 값이면 return
  if (props.total <= totalPageNumbers) return Array.from({ length: props.total }, (_, i) => i + 1);

  const startPages = Array.from({ length: props.boundaryCount }, (_, i) => i + 1);
  const endPages = Array.from({ length: props.boundaryCount }, (_, i) => props.total - props.boundaryCount + 1 + i);

  // ㉡ 시작구간에 머물러 있을 때: [시작] [시작주변] [시작주변] [시작주변] [...] [끝주변] [끝]
  if (props.selectedPage <= props.boundaryCount + props.siblingCount + 1) {
    const front = Array.from({ length: props.boundaryCount + props.siblingCount * 2 + 1 }, (_, i) => i + 1);

    return [...front, 'DOTS', ...endPages];
  }

  // ㉢ 끝구간에 머물러 있을 때: [시작] [시작주변] [...] [끝주변] [끝주변] [끝주변] [끝]
  if (props.selectedPage >= props.total - props.boundaryCount - props.siblingCount) {
    const back = Array.from({ length: props.boundaryCount + props.siblingCount * 2 + 1 }, (_, i) => props.total - (props.boundaryCount + props.siblingCount * 2) + i);

    return [...startPages, 'DOTS', ...back];
  }

  // ㉣ 중간일 때: [시작] [시작주변] [...] [중간] [...] [끝주변] [끝]
  const leftSibling = Math.max(props.selectedPage - props.siblingCount, props.boundaryCount + 1);
  const rightSibling = Math.min(props.selectedPage + props.siblingCount, props.total - props.boundaryCount);
  const middle = Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i);

  return [...startPages, 'DOTS', ...middle, 'DOTS', ...endPages];
};
</script>

<template>
  <li v-for="(page, index) in getPages()" :key="index" tabindex="0">
    <span v-if="page === 'DOTS'" class="dots">...</span>
    <PageBtn v-else :value="page" :disabled="selectedPage === page" @click="changePage" />
  </li>
</template>

<style lang="scss" scoped>
li {
  position: relative;
  top: -1px;

  span {
    display: inline-block;
    width: 16px;
    margin-left: 2px;
    margin-right: 2px;

    @include fontStyle(12px, 400, $gray_a);
  }
}
</style>
