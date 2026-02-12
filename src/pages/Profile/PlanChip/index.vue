<script setup lang="ts">
import QuitSubscriptionBtn from '@/features/user/QuitSubscriptionBtn/index.vue';

defineOptions({ name: 'PlanChip' });
</script>

<template>
  <div class="plan-chip">
    <div class="basic-plan">
      <div class="main-content">
        <div class="title">BASIC PLAN</div>
        <div class="desc">댓글 검사 잔여 100건 이하 시 자동 충전</div>
      </div>
      <div class="credit-amount-desc">200건 / 10,000원</div>
    </div>
    <div class="quit-btn-part">
      <QuitSubscriptionBtn />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.plan-chip {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;

  .basic-plan {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    padding: 20px 30px;
    background-color: $key_color;
    border-radius: 2px;

    @include mobile {
      width: 100%;
      flex-wrap: wrap;
      gap: 20px;
    }

    .main-content {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .title {
        @include fontStyle(16px, 600, $white);
      }

      .desc {
        @include fontStyle(12px, 400, $white);
      }
    }

    .credit-amount-desc {
      padding: 10px 20px;
      border: 1px solid $white;
      border-radius: 2px;

      @include fontStyle(16px, 600, $white);
    }
  }

  .quit-btn-part {
    @include mobile {
      display: flex;
      width: 100%;
      justify-content: end;
    }
  }
}
</style>
