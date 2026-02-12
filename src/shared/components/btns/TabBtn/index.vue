<script setup lang="ts">
interface ITabBtnProps {
  text: string;
  active: boolean;
}

defineProps<ITabBtnProps>();
defineOptions({ name: 'TabBtn' });
defineEmits<{ (e: 'click'): void }>();
</script>

<template>
  <button :class="`tab ${active && 'active'}`" @click="$emit('click')">{{ text }}</button>
</template>

<style lang="scss" scoped>
.tab {
  width: 150px;
  height: 40px;
  align-content: center;
  padding-left: 30px;
  padding-right: 30px;
  background-color: transparent;
  border-bottom: 2px solid $gray_c;
  white-space: nowrap;

  @include fontStyle(16px, 600, $gray_a);

  @include tablet {
    flex: 1;
  }

  &:hover {
    color: $gray_7;
    border-color: $gray_7;
  }

  &.active {
    color: $key_color;
    border-color: $key_color;
  }
}
</style>
