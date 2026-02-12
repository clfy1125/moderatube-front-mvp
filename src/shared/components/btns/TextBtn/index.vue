<script setup lang="ts">
import { VNode } from 'vue';

interface ITextBtnProps {
  text: string | VNode;
  className?: 'primary' | 'second' | string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}
withDefaults(defineProps<ITextBtnProps>(), {
  className: 'primary',
  disabled: false,
  type: 'button'
});
defineOptions({ name: 'TextBtn' });
defineEmits(['click']);
</script>

<template>
  <button :type="type" :class="`text-btn ${className}`" :disabled="disabled" @click="$emit('click')">
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>
.text-btn {
  display: block;
  width: fit-content;
  white-space: nowrap;
  padding-left: 20px;
  padding-right: 20px;
  align-content: center;
  border-radius: 2px;
  transition:
    ease background-color 0.2s,
    color 0.2s;

  @include fontStyle(12px, 600);

  &.primary {
    color: $white;
    background-color: $key_color;

    &:not(:disabled) {
      &:hover {
        background-color: $key_color_hover;
      }

      &:active {
        color: $gray_c;
      }
    }

    &:disabled {
      background-color: $gray_5;
      color: $gray_7;
    }
  }

  &.second {
    color: $gray_2;
    background-color: $gray_d;

    &:not(:disabled) {
      &:hover {
        background-color: $gray_c;
      }
    }

    &:disabled {
      opacity: 0.6;
    }
  }
}
</style>
