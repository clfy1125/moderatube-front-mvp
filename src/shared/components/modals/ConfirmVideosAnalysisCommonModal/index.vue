<script setup lang="ts">
import { ref, watch } from 'vue';

import { usePostVideosProformaInvoice } from '@/features/videos/api/postVideosProformaInvoice';
import CloseModalBtn from '@/shared/components/btns/CloseModalBtn/index.vue';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import IsPending from '@/shared/components/IsPending/index.vue';
import { IModalProps } from '@/shared/components/modals/BaseModal/index.vue';
import { Err } from '@/shared/types/Error';
import { formatKorNumber } from '@/shared/utils/formatKorNumber';

export interface IConfirmVideosAnalysisCommonModalProps extends IModalProps {
  title: string;
  videoIds: string[];
  postAction: 'none' | 'delete';
}

const props = defineProps<IConfirmVideosAnalysisCommonModalProps>();
const emit = defineEmits(['close']);
defineOptions({ name: 'ConfirmVideosAnalysisCommonModal' });

// const alertStore = useAlertStore();
const { mutateAsync: postVideosProformaInvoice, data: proformaInvoice, isPending, isError } = usePostVideosProformaInvoice();

const errMsg = ref('');

const handlePostVideosProformaInvoice = async () => {
  if (!props.showModal) return;

  try {
    await postVideosProformaInvoice({ video_ids: props.videoIds, post_action: props.postAction });
    if (proformaInvoice.value === undefined) return;
  } catch (err) {
    errMsg.value = (err as Err).response.data.error;
    // alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};

watch(() => props.showModal, handlePostVideosProformaInvoice);
</script>

<template>
  <Teleport to="body">
    <modal class-name="confirm-videos-analysis" :show-modal="showModal" @close="$emit('close')">
      <CloseModalBtn @on-click-btn="emit('close')" />
      <div class="title">{{ title }}</div>
      <div class="notice">
        <IsPending v-if="isPending" />
        <div v-else>
          <div v-if="isError" class="err-msg">{{ errMsg }}</div>
          <div v-else class="credit-part">
            필요 검사 건수 <span class="required-credits">{{ formatKorNumber(proformaInvoice?.data?.required_credits) }}건</span> / 잔여건수
            <span :class="`remaining-credits ${(proformaInvoice?.data?.required_credits ?? 0) > (proformaInvoice?.data?.available_credits ?? 0) && 'red'}`">{{ formatKorNumber(proformaInvoice?.data?.available_credits) }}건</span>
          </div>
        </div>
      </div>
      <div class="btns">
        <slot :proforma-invoice="proformaInvoice"></slot>
        <TextBtn text="취소" class="second" @click="$emit('close')" />
      </div>
    </modal>
  </Teleport>
</template>

<style lang="scss">
.confirm-videos-analysis {
  padding: 20px;

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

  .notice {
    text-align: center;

    @include fontStyle(14px, 400);

    .err-msg {
      @include fontStyle(14px, 400);
    }

    .credit-part {
      margin-top: 16px;

      .required-credits {
        color: $key_color;
      }

      .remaining-credits {
        color: $green;

        &.red {
          color: $red;
        }
      }
    }
  }

  .btns {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 20px;

    .text-btn {
      height: 30px;
    }
  }
}
</style>
