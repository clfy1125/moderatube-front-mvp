<script setup lang="ts">
import { ref, watch } from 'vue';

import { usePostChannelProformaInvoice } from '@/features/channel/api/postChannelProformaInvoice';
import CloseModalBtn from '@/shared/components/btns/CloseModalBtn/index.vue';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import IsPending from '@/shared/components/IsPending/index.vue';
import { IModalProps } from '@/shared/components/modals/BaseModal/index.vue';
import { useChannelIdStore } from '@/shared/store/useChannelIdStore';
import { Err } from '@/shared/types/Error';
import { formatKorNumber } from '@/shared/utils/formatKorNumber';

export interface IConfirmChannelAnalysisCommonModalProps extends IModalProps {
  title: string;
  postAction: 'none' | 'delete';
}

const props = defineProps<IConfirmChannelAnalysisCommonModalProps>();
const emit = defineEmits(['close']);
defineOptions({ name: 'ConfirmChannelAnalysisCommonModal' });

// const alertStore = useAlertStore();
const channelIdStore = useChannelIdStore();

const { mutateAsync: postChannelProformaInvoice, data: proformaInvoice, isPending, isError } = usePostChannelProformaInvoice();

const errMsg = ref('');

const handlePostChannelProformaInvoice = async () => {
  if (!props.showModal) return;

  try {
    await postChannelProformaInvoice({ channelId: channelIdStore.channelId, post_action: props.postAction });
    if (proformaInvoice.value === undefined) return;
  } catch (err) {
    errMsg.value = (err as Err).response.data.error;
  }
};

watch(() => props.showModal, handlePostChannelProformaInvoice);
</script>

<template>
  <Teleport to="body">
    <modal class-name="confirm-channel-analysis" :show-modal="showModal" @close="$emit('close')">
      <CloseModalBtn @on-click-btn="emit('close')" />
      <div class="title">{{ title }}</div>
      <div v-if="isError" class="err-msg">{{ errMsg }}</div>

      <div v-else class="notice">
        <div>전체 스팸 검사는 시간이 오래 걸릴 수 있으며,</div>
        <div>최신 영상에 대해 스팸 검사를 진행하는 것이 효과적입니다.</div>
        <IsPending v-if="isPending" />
        <div v-else class="credit-part">
          필요 검사 건수 <span class="required-credits">{{ formatKorNumber(proformaInvoice?.data?.required_credits) }}건</span> / 잔여건수
          <span :class="`remaining-credits ${(proformaInvoice?.data?.required_credits ?? 0) > (proformaInvoice?.data?.available_credits ?? 0) && 'red'}`">{{ formatKorNumber(proformaInvoice?.data?.available_credits) }}건</span>
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
.confirm-channel-analysis {
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

  .err-msg {
    @include fontStyle(14px, 400);
  }

  .notice {
    text-align: center;

    @include fontStyle(14px, 400);

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
