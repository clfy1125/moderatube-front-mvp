<!-- 스팸 검사 결과 모달 -->
<script setup lang="ts">
import { ref } from 'vue';

import { ReportItem } from '@/features/comment/ClassifiedCommentsPanel/index.vue';
import { ECommentOption } from '@/features/comment/SelectCommentOption/enum';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import CommentStateCell from '@/shared/components/cells/CommentStateCell/index.vue';
import { IModalProps } from '@/shared/components/modals/BaseModal/index.vue';
import ReportAsNonSpamModal from '@/shared/components/modals/ReportAsNonSpamModal/index.vue';

interface IExaminedSpamModalProps extends IModalProps {}
defineProps<IExaminedSpamModalProps>();
defineEmits(['close', 'delete']);
defineOptions({ name: 'ExaminedSpamModal' });

const reportData = ref<ReportItem>({ comment_id: '', author_display_name: '', text_display: '' });

const showReportAsNonSpamModal = ref(false);
const openShowReportAsNonSpamModal = () => (showReportAsNonSpamModal.value = true);
const onCloseShowReportAsNonSpamModal = () => (showReportAsNonSpamModal.value = false);
</script>

<!-- 필요한 것들: 검사가 완료된 상태값 수신 & 검사된 댓글 리스트 필요 -->
<template>
  <Teleport to="body">
    <modal class-name="examined-spam" :show-modal="showModal" @close="$emit('close')">
      <div class="examined-spam-header">총 15개의 스팸이 검사되었습니다.</div>

      <ul>
        <li>
          <div>15</div>
          <div>apple01</div>
          <div>댓글 내용입니다. 가나다라마</div>
          <CommentStateCell :state="ECommentOption.spam" />
          <TextBtn text="스팸 아님" @click="openShowReportAsNonSpamModal" />
        </li>
      </ul>

      <div class="btns">
        <!-- 영상관리 페이지인지, 댓글관리 페이지인지에 따라서 해야할 fn이 다를 것으로 예상됨 -->
        <TextBtn text="스팸 전부 삭제" @click="$emit('delete')" />
        <TextBtn text="닫기" @click="$emit('close')" />
      </div>
    </modal>
  </Teleport>

  <!-- 스팸 아님 클릭시 선택한 id가 필요 -->
  <ReportAsNonSpamModal :show-modal="showReportAsNonSpamModal" :report-data="reportData" @close="onCloseShowReportAsNonSpamModal" />
</template>

<style lang="scss">
.examined-spam {
  padding: 20px;

  & > .header {
    /* ... */
  }

  & > ul {
    width: 514px;

    & > li {
      display: flex;
    }
  }

  & > .btns {
    display: flex;
  }
}
</style>
