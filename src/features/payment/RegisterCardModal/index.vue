<!-- 카드 등록 모달 -->
<script setup lang="ts">
import { reactive } from 'vue';

import CloseModalBtn from '@/shared/components/btns/CloseModalBtn/index.vue';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import { IModalProps } from '@/shared/components/modals/BaseModal/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { onlyNumberRegex } from '@/shared/utils/regex';

interface IRegisterCardModalProps extends IModalProps {}
defineProps<IRegisterCardModalProps>();
defineEmits(['close']);
defineOptions({ name: 'RegisterCardModal' });

const alertStore = useAlertStore();

const cardInfo = reactive({
  cardNumber: '',
  expireAt: '',
  cvc: '',
  cardPw: ''
});

const customer = reactive({
  firstName: '',
  lastName: '',
  phoneNumber: {
    first: '',
    middle: '',
    last: ''
  },
  email: ''
});
</script>

<template>
  <Teleport to="body">
    <modal class-name="register-card" :show-modal="showModal" @close="$emit('close')">
      <CloseModalBtn @on-click-btn="onClose" />
      <div class="title">카드 등록</div>

      <form @submit.prevent="() => {}">
        <div class="customer-fields">
          <!-- todo 이벤트 연결 안함 -->
          <input v-model="customer.email" type="text" placeholder="카드번호" />
          <input v-model="customer.email" type="text" placeholder="유효기간 (YY/MM)" />
          <input v-model="customer.email" type="text" placeholder="CVC" />
          <input v-model="customer.email" type="text" placeholder="카드비밀번호 앞 2자리" />

          <div class="name-part">
            <input v-model="customer.lastName" type="text" placeholder="성" />
            <input v-model="customer.firstName" type="text" placeholder="이름" />
          </div>
          <div class="phone-part">
            <input v-model="customer.phoneNumber.first" type="text" placeholder="010" maxlength="3" @input="(e: Event) => (customer.phoneNumber.first = (e.target as HTMLInputElement).value.replace(onlyNumberRegex, ''))" />
            <div class="division">-</div>
            <input v-model="customer.phoneNumber.middle" type="text" maxlength="4" @input="(e) => (customer.phoneNumber.middle = (e.target as HTMLInputElement).value.replace(onlyNumberRegex, ''))" />
            <div class="division">-</div>
            <input v-model="customer.phoneNumber.last" type="text" maxlength="4" @input="(e) => (customer.phoneNumber.last = (e.target as HTMLInputElement).value.replace(onlyNumberRegex, ''))" />
          </div>
          <input v-model="customer.email" type="text" placeholder="이메일" />
        </div>

        <div class="btns-part">
          <TextBtn type="submit" text="저장" @click="$emit('close')" />
          <TextBtn text="닫기" @click="$emit('close')" />
        </div>
      </form>
    </modal>
  </Teleport>
</template>

<style lang="scss">
.register-card {
  display: flex;
  flex-direction: column;
  padding: 20px 20px 40px 20px;
  overflow: hidden;

  @include mobile {
    width: 90%;
    max-height: 65%;
  }

  .customer-fields {
    width: 420px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-left: 60px;
    padding-right: 60px;

    @include mobile {
      width: 100%;
      padding-left: 0;
      padding-right: 0;
    }

    input {
      border: 1px solid $gray_c;
      border-radius: 2px;
      height: 40px;
      padding-left: 10px;
      padding-right: 10px;
      text-overflow: ellipsis;
      overflow: hidden;

      @include fontStyle(14px, 600);

      &::placeholder {
        color: $gray_a;
      }
    }

    .name-part {
      display: flex;
      gap: 10px;

      input {
        width: 50%;
      }
    }

    .phone-part {
      display: flex;

      input {
        width: 33%;
      }

      .division {
        align-content: center;
        padding-left: 10px;
        padding-right: 10px;
        color: $gray_2;
      }
    }
  }

  & > .btns {
    display: flex;
  }
}
</style>
