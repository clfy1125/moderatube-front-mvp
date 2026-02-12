<script setup lang="ts">
import { VNode } from 'vue';

interface ILoadingBtnProps {
  text: string | VNode;
  className?: 'primary' | 'second' | string;
  isLoading?: boolean;
  disabled?: boolean;
}
withDefaults(defineProps<ILoadingBtnProps>(), {
  className: 'primary',
  isLoading: false,
  disabled: false
});

defineOptions({ name: 'LoadingBtn' });
defineEmits(['click']);
</script>

<template>
  <button :disabled="disabled" :class="`loading-btn ${className} ${isLoading && 'is-loading'}`" @click="$emit('click')">
    <div :class="`spinner-icon ${isLoading && 'is-loading'}`"></div>
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>
.loading-btn {
  display: flex;
  align-items: center;
  width: fit-content;
  height: 30px;
  white-space: nowrap;
  padding-left: 20px;
  padding-right: 20px;
  align-content: center;
  border-radius: 2px;
  transition:
    ease background-color 0.2s,
    color 0.2s,
    padding 0.3s;

  @include fontStyle(12px, 600);

  .spinner-icon {
    width: 0px;
    transition: 0.3s width ease-in-out;

    &.is-loading {
      width: 14px;
      height: 14px;
      margin-right: 10px;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('@/shared/assets/spinner-icon.svg');
      animation: rotation 1.4s steps(12) infinite;
    }
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

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
      color: $key_color_light;
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
  }
}
</style>
