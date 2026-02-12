<!-- (댓글관리 페이지)의 오류신고 공용 모달 -->
<script setup lang="ts">
import CloseModalBtn from '@/shared/components/btns/CloseModalBtn/index.vue';
import { IModalProps } from '@/shared/components/modals/BaseModal/index.vue';
defineProps<IModalProps>();
defineEmits(['close']);
defineOptions({ name: 'ReportModal' });
</script>

<template>
  <Teleport to="body">
    <modal class-name="report" :show-modal="showModal" @close="$emit('close')">
      <CloseModalBtn @on-click-btn="$emit('close')" />
      <div class="title">오류 신고</div>
      <slot></slot>
    </modal>
  </Teleport>
</template>

<style lang="scss">
.report {
  display: flex;
  flex-direction: column;
  width: 437px;
  padding: 20px 20px 40px 20px;
  overflow: hidden;

  @include mobile {
    width: 90%;
    max-height: 65%;
  }

  .title {
    flex-shrink: 0;
    text-align: center;
    margin-bottom: 20px;

    @include fontStyle(14px, 600);
  }
}
</style>
