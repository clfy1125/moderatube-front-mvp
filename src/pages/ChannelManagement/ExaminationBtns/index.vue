<script setup lang="ts">
import LoadingBtn from '@/shared/components/btns/LoadingBtn/index.vue';

interface IExaminationBtnsProps {
  itemsLength: number;
  checkedIdsLength: number;
}

type ExaminationBtnsEmits = {
  (e: 'on-channel-analysis'): void;
  (e: 'on-channel-analysis-delete'): void;
  (e: 'on-videos-analysis'): void;
  (e: 'on-videos-analysis-delete'): void;
};

defineProps<IExaminationBtnsProps>();
defineEmits<ExaminationBtnsEmits>();
defineOptions({ name: 'ExaminationBtns' });
</script>

<template>
  <div ref="btnsPartRef" class="btns-part">
    <!-- :disabled="true" :is-loading="true" 나중에 연동하기 -->
    <LoadingBtn v-if="itemsLength > 0 && checkedIdsLength === 0" text="전체 스팸 검사" @click="$emit('on-channel-analysis')" />
    <LoadingBtn v-if="itemsLength > 0 && checkedIdsLength === 0" text="전체 스팸 검사 후 삭제" @click="$emit('on-channel-analysis-delete')" />
    <LoadingBtn v-if="checkedIdsLength > 0" text="선택 스팸 검사" class-name="second" @click="$emit('on-videos-analysis')" />
    <LoadingBtn v-if="checkedIdsLength > 0" text="선택 스팸 검사 후 삭제" class-name="second" @click="$emit('on-videos-analysis-delete')" />
  </div>
</template>

<style lang="scss" scoped>
.btns-part {
  display: flex;
  width: fit-content;
  gap: 10px;
  padding-left: 10px;
  transform: translateY(-97px);

  .text-btn {
    height: 30px;
  }

  @include tablet {
    width: 100%;
    height: 70px;
    flex-shrink: 0;
    transform: none;
    padding: 20px 28.5px;
    border-top: 1px solid $gray_d;
  }
}
</style>
