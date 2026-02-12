<!-- 오류신고 모달: "스팸이 아닌 것 같다면 (= false_positive)" 신고 모달 -->
<script setup lang="ts">
import { usePostReports } from '@/features/comment/api/postReports';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';

interface IReportAsNonSpamBtnProps {
  commentId: string;
  text: string;
}

const props = defineProps<IReportAsNonSpamBtnProps>();
const emit = defineEmits(['resolve']);
defineOptions({ name: 'ReportAsNonSpamBtn' });

const alertStore = useAlertStore();

const { mutateAsync: postReports, data: reportResult } = usePostReports();

const handlePostReports = async () => {
  try {
    await postReports({
      comment_id: props.commentId,
      report_type: 'false_positive',
      content: '오발견'
    });

    if (reportResult.value === undefined) return;

    emit('resolve');
    alertStore.changeAlert({ open: true, error: reportResult.value.data.message, error_code: '오발견 신고완료' });
  } catch (err) {
    emit('resolve');
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};
</script>

<template>
  <!-- @click="오발견스팸신고fn" -->
  <TextBtn class-name="primary non-spam-btn" :text="text" @click="handlePostReports" />
</template>

<style lang="scss" scoped></style>
