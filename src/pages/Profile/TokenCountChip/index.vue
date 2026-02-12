<script setup lang="ts">
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import { formatKorNumber } from '@/shared/utils/formatKorNumber';

interface ITokenCountChipProps {
  credit?: number;
}

defineProps<ITokenCountChipProps>();
defineOptions({ name: 'TokenCountChip' });
defineEmits(['on-select-chart']);
</script>

<template>
  <div class="token-count-chip">
    <p>댓글 검사 잔여 건수</p>
    <div>
      <span class="remaining-count"> {{ formatKorNumber(credit) }}건</span>
      <TextBtn text="충전" @click="$emit('on-select-chart')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.token-count-chip {
  max-width: 320px;
  display: flex;
  gap: 60px;
  align-items: center;
  justify-content: space-between;

  @include mobile {
    flex-direction: column;
    align-items: start;
    gap: 10px;
    max-width: 100%;
  }

  & > p {
    white-space: nowrap;
    @include fontStyle(16px, 600, $gray_2);
  }

  & > div {
    display: flex;
    gap: 20px;
    align-items: center;

    .remaining-count {
      white-space: nowrap;
      @include fontStyle(16px, 600, $gray_2);
    }
  }

  .text-btn {
    height: 30px;
  }
}
</style>
