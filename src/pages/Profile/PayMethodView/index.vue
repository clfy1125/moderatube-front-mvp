<script setup lang="ts">
// import AddCardBtn from '@/features/payment/AddCardBtn/index.vue';
// import RegisteredCardChip from '@/features/payment/RegisteredCardChip/index.vue';
defineOptions({ name: 'PayMethodView' });
</script>

<template>
  <div class="pay-method-view">
    <div class="category-part">
      <div class="title">
        <div class="radio"></div>
        카드결제
      </div>

      <!-- 
        <div class="card-list">
          <RegisteredCardChip /> // 등록한 카드가 있다면
          <AddCardBtn /> // 등록한 카드가 없다면
        </div> 
      -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pay-method-view {
  padding: 30px 30px 40px 30px;
  border: 1px solid $gray_d;

  .category-part {
    .title {
      display: flex;
      gap: 10px;

      @include fontStyle(14px, 600, $gray_2);

      .radio {
        width: 16px;
        height: 16px;
        background-image: url('@/shared/assets/radio-on-icon.svg');
      }
    }

    .card-list {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 20px;
    }
  }
}
</style>
