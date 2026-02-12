<script setup lang="ts">
import { usePostChannelSpamAnalysis } from '@/features/channel/api/postChannelSpamAnalysis';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import { IModalProps } from '@/shared/components/modals/BaseModal/index.vue';
import ConfirmChannelAnalysisCommonModal from '@/shared/components/modals/ConfirmChannelAnalysisCommonModal/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { useChannelIdStore } from '@/shared/store/useChannelIdStore';
import { Err } from '@/shared/types/Error';

defineProps<IModalProps>();
const emit = defineEmits(['close']);
defineOptions({ name: 'ConfirmAnalysisAndDelModal' });

const alertStore = useAlertStore();
const channelIdStore = useChannelIdStore();

const { mutateAsync: postChannelSpamAnalysis, data: spamAnalysis, isPending } = usePostChannelSpamAnalysis();

const handlePostChannelSpamAnalysis = async () => {
  try {
    await postChannelSpamAnalysis({ channelId: channelIdStore.channelId, post_action: 'delete' });
    if (spamAnalysis.value === undefined) return;

    if (spamAnalysis.value.success)
      alertStore.changeAlert({
        open: true,
        error_code: '요청결과',
        error: spamAnalysis.value.data.message + ' (분석 성공시 반영 하기까지 다소 시간이 걸릴 수 있습니다.)'
      });

    emit('close');
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};
</script>

<template>
  <ConfirmChannelAnalysisCommonModal v-slot="{ proformaInvoice }" title="전체 스팸 검사 후 삭제" post-action="delete" :show-modal="showModal" @close="$emit('close')">
    <!-- 로딩 오버레이 -->
    <div v-if="isPending" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    
    <TextBtn
      v-if="proformaInvoice !== undefined"
      text="전체 스팸 검사 후 삭제"
      :disabled="isPending || proformaInvoice.data.required_credits === 0 || proformaInvoice.data.required_credits > proformaInvoice.data.available_credits"
      @click="handlePostChannelSpamAnalysis"
    />
  </ConfirmChannelAnalysisCommonModal>
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
