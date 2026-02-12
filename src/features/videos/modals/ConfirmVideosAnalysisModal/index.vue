<script setup lang="ts">
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import ConfirmVideosAnalysisCommonModal, { IConfirmVideosAnalysisCommonModalProps } from '@/shared/components/modals/ConfirmVideosAnalysisCommonModal/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';

import { usePostVideosSpamAnalysis } from '../../api/postVideosSpamAnalysis';

const props = defineProps<Omit<IConfirmVideosAnalysisCommonModalProps, 'postAction'>>();
const emit = defineEmits(['close', 'on-success']);

defineOptions({ name: 'ConfirmVideosAnalysisModal' });

const alertStore = useAlertStore();

const { mutateAsync: postVideosSpamAnalysis, data: spamAnalysis, isPending } = usePostVideosSpamAnalysis();

const handlePostVideosSpamAnalysis = async () => {
  try {
    await postVideosSpamAnalysis({ video_ids: props.videoIds, post_action: 'none' });
    if (spamAnalysis.value === undefined) return;

    if (spamAnalysis.value.success)
      alertStore.changeAlert({
        open: true,
        error_code: '요청결과',
        error: spamAnalysis.value.data.message + ' (분석 성공시 반영 하기까지 다소 시간이 걸릴 수 있습니다.)'
      });
    emit('on-success');
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};
</script>

<template>
  <ConfirmVideosAnalysisCommonModal v-slot="{ proformaInvoice }" :title="title" :video-ids="videoIds" post-action="none" :show-modal="showModal" @close="$emit('close')">
    <!-- 로딩 오버레이 -->
    <div v-if="isPending" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    
    <TextBtn 
      v-if="proformaInvoice !== undefined" 
      :text="title" 
      :disabled="isPending || proformaInvoice.data.required_credits === 0 || proformaInvoice.data.required_credits > proformaInvoice.data.available_credits" 
      @click="handlePostVideosSpamAnalysis" 
    />
  </ConfirmVideosAnalysisCommonModal>
</template>

<style lang="scss" scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: not-allowed;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
