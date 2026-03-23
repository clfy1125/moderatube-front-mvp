<script setup lang="ts">
import { ref } from 'vue';

import PaymentHistoryPanel from '@/features/payment/PaymentHistoryPanel/index.vue';
import CreditHistoryPanel from '@/features/user/CreditHistoryPanel/index.vue';
import GoBackBtn from '@/shared/components/btns/GoBackBtn/index.vue';
import PageFooter from '@/shared/components/Footer/index.vue';
import TabBtns from '@/shared/components/TabBtns/index.vue';

import { EHistoryTabEnum } from '../enum';

defineOptions({ name: 'HistoryWidget' });

const tab = ref<EHistoryTabEnum>(EHistoryTabEnum.CREDIT);
const changeTab = (selectedTab: string) => (tab.value = selectedTab as EHistoryTabEnum);
</script>

<template>
  <div class="history-widget">
    <div class="main-content">
      <GoBackBtn text="마이페이지" link="/app/profile" />

      <div class="upper-part">
        <TabBtns :list="Object.values(EHistoryTabEnum)" :tab="tab" @on-select-tab="changeTab" />
        <p class="notice-text">환불 문의는 이메일로 접수해 주세요.</p>
      </div>

      <CreditHistoryPanel v-if="tab === EHistoryTabEnum.CREDIT" />
      <PaymentHistoryPanel v-else />

      <p class="mobile-notice-text">환불 문의는 이메일로 접수해 주세요.</p>
    </div>
    <PageFooter />
  </div>
</template>

<style lang="scss">
.history-widget {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1292px;
  height: max-content;
  padding: 30px 40px;

  @include tablet {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 4%;
    padding-right: 4%;
  }

  .main-content {
    .go-back-btn {
      width: fit-content;
    }

    .upper-part {
      margin-top: 30px;
      position: relative;

      @include mobile {
        margin-top: 50px;
      }

      .notice-text {
        position: absolute;
        top: 13px;
        right: 0;

        @include fontStyle(12px, 300, $gray_a);

        @include mobile {
          display: none;
        }
      }
    }

    .mobile-notice-text {
      display: none;
      margin-top: 50px;

      @include fontStyle(12px, 300, $gray_a);

      @include mobile {
        display: block;
      }
    }
  }
}
</style>
