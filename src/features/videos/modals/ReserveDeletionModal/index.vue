<script setup lang="ts">
import { ref, watch } from 'vue';

import { useRoute } from 'vue-router';

import CloseModalBtn from '@/shared/components/btns/CloseModalBtn/index.vue';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import { IModalProps } from '@/shared/components/modals/BaseModal/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';
import { onlyNumberRegex } from '@/shared/utils/regex';

import { usePostReserveDeletion } from '../../api/postReserveDeletion';

type ReserveDeletionModalEmits = {
  (e: 'close'): void;
  (e: 'on-reserved', newTime: string): void;
};

interface IReserveDeletionModalProps extends IModalProps {
  autoDeletionAt?: string; // 12:11:10
}

const props = defineProps<IReserveDeletionModalProps>();
const emit = defineEmits<ReserveDeletionModalEmits>();
defineOptions({ name: 'ReserveDeletionModal' });

const route = useRoute();
const alertStore = useAlertStore();

const { mutateAsync: reserveDeletion, data } = usePostReserveDeletion();

const inputTime = ref({ hour: '', min: '', sec: '' });

const resetTime = () => {
  if (!props.autoDeletionAt) inputTime.value = { hour: '', min: '', sec: '' };
  else {
    const time = props.autoDeletionAt.split(':');
    inputTime.value = { hour: time[0], min: time[1], sec: time[2] };
  }
};

const handleReverveDeletion = async () => {
  try {
    // 날짜 형태  HH:MM:SS 형식 "06:52:07.464Z"
    await reserveDeletion({ video_id: route.params.id as string, auto_deletion_at: `${inputTime.value.hour}:${inputTime.value.min}:${inputTime.value.sec}` });
    if (data.value?.data.is_auto_deletion_reserved) {
      alertStore.changeAlert({
        open: true,
        error_code: '요청 완료',
        error: `(${data.value.data.auto_deletion_at}) ${data.value.data.message}`
      });

      emit('on-reserved', data.value.data.auto_deletion_at);
    }
  } catch (err) {
    alertStore.changeAlert({
      open: true,
      error_code: (err as Err).response.data.error_code,
      error: (err as Err).response.data.error
    });
  }
};

watch(() => props.showModal, resetTime);
</script>

<template>
  <Teleport to="body">
    <modal class-name="reserve-deletion" :show-modal="showModal" @close="$emit('close')">
      <CloseModalBtn @on-click-btn="$emit('close')" />
      <div class="title">스팸 삭제 예약</div>
      <div class="sub-text">매일 스팸 삭제를 진행할 시간을 설정해주세요.</div>
      <div class="content">
        <div class="time-fields">
          <input v-model="inputTime.hour" type="text" placeholder="13" maxlength="2" @input="(e) => (inputTime.hour = (e.target as HTMLInputElement).value.replace(onlyNumberRegex, ''))" />
          <span class="unit">시</span>

          <input v-model="inputTime.min" type="text" placeholder="00" maxlength="2" @input="(e) => (inputTime.min = (e.target as HTMLInputElement).value.replace(onlyNumberRegex, ''))" />
          <span class="unit">분</span>

          <input v-model="inputTime.sec" type="text" placeholder="00" maxlength="2" @input="(e) => (inputTime.sec = (e.target as HTMLInputElement).value.replace(onlyNumberRegex, ''))" />
          <span class="unit">초</span>
        </div>
        <button class="reset-btn" @click="resetTime"></button>
      </div>
      <div class="btns-part">
        <TextBtn text="저장" :disabled="Object.values(inputTime).some((t) => !t)" @click="handleReverveDeletion" />
        <TextBtn class="second" text="취소" @click="$emit('close')" />
      </div>
    </modal>
  </Teleport>
</template>

<style lang="scss">
.reserve-deletion {
  display: flex;
  flex-direction: column;
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

  .sub-text {
    text-align: center;
    margin-bottom: 20px;

    @include fontStyle(14px, 400);
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-left: 60px;
    margin-right: 60px;

    @include mobile {
      margin-left: 0;
      margin-right: 0;
    }

    .time-fields {
      display: flex;
      align-items: center;
      gap: 9px;

      input {
        width: 44px;
        height: 40px;
        padding-left: 10px;
        padding-right: 10px;
        border: 1px solid $gray_d;
        border-radius: 2px;

        @include fontStyle(14px, 600, $key_color);

        &:focus {
          border-color: $key_color;
        }

        &::placeholder {
          color: $gray_d;
        }
      }

      .unit {
        @include fontStyle(14px, 600);
      }
    }

    .reset-btn {
      flex-shrink: 0;
      width: 26px;
      height: 22px;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('@/shared/assets/reset-icon.svg');
    }
  }

  .btns-part {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;

    .text-btn {
      width: 60px;
      height: 30px;
    }
  }
}
</style>
