<script setup lang="ts">
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import { IModalProps } from '@/shared/components/modals/BaseModal/index.vue';

interface IAlertModalProps extends IModalProps {
  errorCode: string;
  error: string;
}

defineProps<IAlertModalProps>();
defineEmits(['close']);
defineOptions({ name: 'AlertModal' });
</script>

<template>
  <Teleport to="body">
    <modal class-name="alert" :show-modal="showModal" @close="$emit('close')">
      <div class="notice">
        <div class="title">{{ errorCode }}</div>
        <div>{{ error }}</div>
      </div>
      <div class="btns">
        <TextBtn text="확인" @click="$emit('close')" />
      </div>
    </modal>
  </Teleport>
</template>

<style lang="scss">
.alert {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  @include mobile {
    width: 90%;
    max-height: 65%;
  }

  .notice {
    text-align: center;

    @include fontStyle(14px, 400);

    .title {
      margin-bottom: 20px;
    }
  }

  .btns {
    display: flex;
    justify-content: center;

    .text-btn {
      height: 30px;
    }
  }
}
</style>
