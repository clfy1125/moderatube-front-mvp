<script setup lang="ts">
import { usePostReports } from '@/features/comment/api/postReports';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';

interface IReportAsSpamBtnProps {
  commentId: string;
  text: string;
}
const props = defineProps<IReportAsSpamBtnProps>();
const emit = defineEmits(['resolve']);
defineOptions({ name: 'ReportAsSpamBtn' });

const alertStore = useAlertStore();

const { mutateAsync: postReports, data: reportResult } = usePostReports();

const handlePostReports = async () => {
  try {
    await postReports({
      comment_id: props.commentId,
      report_type: 'false_negative',
      content: '미발견'
    });

    if (reportResult.value === undefined) return;

    emit('resolve');
    alertStore.changeAlert({ open: true, error: reportResult.value.data.message, error_code: '미발견 신고완료' });
  } catch (err) {
    emit('resolve');
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};
</script>

<template>
  <!-- @click="미발견스팸신고fn" -->
  <TextBtn class-name="primary spam-btn" :text="text" @click="handlePostReports" />
</template>

<style lang="scss" scoped></style>
