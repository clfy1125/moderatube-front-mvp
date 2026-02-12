<script lang="ts" setup>
import { ref } from 'vue';

interface IToolTipProps {
  text: string;
  textColor?: string;
  backgroundColor?: string;
}

withDefaults(defineProps<IToolTipProps>(), {
  textColor: '#fff',
  backgroundColor: '#333'
});
defineOptions({ name: 'ToolTip' });

const tooltipRef = ref<HTMLSpanElement | null>(null);
</script>

<template>
  <span ref="tooltipRef" class="tooltip" :data-tooltip="text">
    <slot></slot>
    <div class="tail"></div>
  </span>
</template>

<style lang="scss" scoped>
.tooltip {
  &[data-tooltip] {
    position: relative;
    cursor: default;
    height: 32px;

    &::after {
      position: absolute;
      bottom: 110%;
      left: 50%;
      transform: translateX(-50%);
      display: inline-block;
      padding: 2px 10px;
      text-align: center;
      box-sizing: border-box;

      content: attr(data-tooltip);

      background: v-bind(backgroundColor);
      border-radius: 4px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.1s ease-in;

      @include fontStyle(11px, 400, v-bind(textColor), 1.4);
    }

    .tail {
      position: absolute;
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid v-bind(backgroundColor);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.1s ease-in;
    }

    &:hover {
      &::after,
      .tail {
        opacity: 1;
        visibility: visible;
      }
    }
  }
}
</style>
