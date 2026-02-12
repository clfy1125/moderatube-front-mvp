<script setup lang="ts">
defineOptions({ name: 'AddCardBtn' });

const onClickAddCardBtn = () => {};
</script>

<template>
  <div>
    <button @click="onClickAddCardBtn">카드추가</button>
  </div>
</template>

<style lang="scss" scoped>
div {
  width: 145px;
  padding: 20px 30px;
  border: 2px solid $key_color;
  border-radius: 2px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85px;
    height: 30px;

    @include fontStyle(12px, 600, $gray_2);
  }
}
</style>
