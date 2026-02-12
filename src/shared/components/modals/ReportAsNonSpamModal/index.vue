<!-- "스팸이 아닌 것 같아 보인다면" (= false_positive) 모달 -->
<script setup lang="ts">
import { ReportItem } from '@/features/comment/ClassifiedCommentsPanel/index.vue';
import ReportAsNonSpamBtn from '@/shared/components/btns/ReportAsNonSpamBtn/index.vue';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import { IModalProps } from '@/shared/components/modals/BaseModal/index.vue';
import ReportModal from '@/shared/components/modals/ReportModal/index.vue';

interface IProps extends IModalProps {
  reportData: ReportItem;
}

defineProps<IProps>();
defineEmits(['close']);
defineOptions({ name: 'ReportAsNonSpamModal' });
</script>

<template>
  <ReportModal :show-modal="showModal" @close="$emit('close')">
    <div class="slot">
      <!-- eslint-disable-next-line prettier/prettier -->
      <div class="content">{{ reportData.author_display_name }} {{ reportData.text_display.replaceAll('<br>', '\n') }}</div>
      <div class="notice">
        <p>선택하신 댓글이 스팸이 아닌 것 같다면</p>
        <p>Moderatube에 신고 해주세요.</p>
      </div>
      <div class="btns">
        <ReportAsNonSpamBtn :comment-id="reportData.comment_id" text="오발견 스팸 신고" @resolve="$emit('close')" />
        <TextBtn class-name="second" text="취소" @click="$emit('close')" />
      </div>
    </div>
  </ReportModal>
</template>

<style lang="scss" scoped>
.slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  @include mobile {
    margin-left: 0px;
    margin-right: 0px;
  }

  .content {
    flex-grow: 1;
    min-height: 50px;
    max-height: 100px;
    white-space: pre-line;
    overflow-y: scroll;

    @include fontStyle(14px, 600, $black, 110%);

    @include mobile {
      max-height: unset;
    }
  }

  .notice {
    flex-shrink: 0;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 30px;

    @include fontStyle(14px, 400);
  }

  .btns {
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    width: 200px;
    gap: 20px;

    .non-spam-btn {
      width: 119px;
      height: 30px;
    }
  }
}
</style>
