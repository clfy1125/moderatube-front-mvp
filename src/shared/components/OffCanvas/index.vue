<script setup lang="ts">
import { ref, watch } from 'vue';

interface IOffCanvasProps {
  className: string;

  /** 애니메이션 재생 시간 (100ms 단위, 최소 0 ~ 최대 1초) */
  duration?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  /** 배경 투명도 (0.1 단위, 최소 0 ~ 최대 1) */
  opacity?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  /** 열리는 위치  */
  position?: 'vertical-top' | 'vertical-bottom' | 'horizontal-right' | 'horizontal-left';
  /** backdrop 클릭을 통한 닫기 */
  isBackdropClosable?: boolean;
  /** ESC 키를 통한 닫기 */
  isESCClosable?: boolean;

  isOpen: boolean;
  closeOffcanvas: () => void;
}

const props = withDefaults(defineProps<IOffCanvasProps>(), {
  duration: 4,
  opacity: 3,
  position: 'horizontal-right',
  isBackdropClosable: true,
  isESCClosable: false
});
defineOptions({ name: 'OffCanvas' });

let focusTimer: any;

const offcanvasRef = ref<HTMLDivElement | null>(null);
const onClickBackdrop = () => props.isBackdropClosable && props.closeOffcanvas();
const onKeyUp = () => props.isESCClosable && props.closeOffcanvas();

watch(
  () => props.isOpen,
  () => {
    if (props.isOpen) focusTimer = setTimeout(() => offcanvasRef.value?.focus(), props.duration * 100);

    return () => clearTimeout(focusTimer);
  }
);
</script>

<template>
  <div ref="offcanvasRef" :tabIndex="-1" :data-duration="duration" :data-opacity="opacity" :class="`offcanvas ${className} ${position} ${isOpen && 'open'}`" @click="onClickBackdrop" @keyup.escape="onKeyUp">
    <div class="offcanvas-overlay" @click.stop="() => {}">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$cubic-bezier: cubic-bezier(0.165, 0.84, 0.44, 1);

@for $i from 0 through 10 {
  @keyframes fade-in-#{$i} {
    0% {
      background: rgba(0, 0, 0, 0%);
    }
    100% {
      background: rgba(0, 0, 0, $i * 0.1);
    }
  }

  @keyframes fade-out-#{$i} {
    0% {
      background: rgba(0, 0, 0, $i * 0.1);
    }
    100% {
      background: rgba(0, 0, 0, 0%);
    }
  }
}

.offcanvas {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: 100dvh;
  visibility: hidden;

  &:focus {
    outline: none;
  }

  &.open {
    visibility: visible;
  }

  @for $i from 0 through 10 {
    &[data-opacity='#{$i}'] {
      animation-name: fade-out-#{$i};

      &.open {
        animation-name: fade-in-#{$i};
        animation-timing-function: $cubic-bezier;
        animation-fill-mode: forwards;
      }
    }
  }

  @for $i from 0 through 10 {
    &[data-duration='#{$i}'] {
      transition: visibility calc(100ms * $i);
      animation-duration: calc(100ms * $i);

      .offcanvas-overlay {
        transition: transform calc(100ms * $i);
      }
    }
  }

  .offcanvas-overlay {
    position: fixed;
    z-index: 1;
  }

  &.horizontal-right,
  &.horizontal-left {
    .offcanvas-overlay {
      top: 0;
      width: 190px;
      height: 100dvh;
    }
  }

  &.vertical-top,
  &.vertical-bottom {
    .offcanvas-overlay {
      left: 0;
      width: 100vw;
      height: 190px;
    }
  }

  &.horizontal {
    &-right {
      .offcanvas-overlay {
        right: 0;
        transform: translateX(100%);
      }

      &.open {
        .offcanvas-overlay {
          transform: translateX(0%);
        }
      }
    }

    &-left {
      .offcanvas-overlay {
        left: 0;
        transform: translateX(-100%);
      }

      &.open {
        .offcanvas-overlay {
          transform: translateX(0%);
        }
      }
    }
  }

  &.vertical {
    &-top {
      .offcanvas-overlay {
        top: 0;
        transform: translateY(-100%);
      }

      &.open {
        .offcanvas-overlay {
          transform: translateX(0%);
        }
      }
    }

    &-bottom {
      .offcanvas-overlay {
        bottom: 0;
        transform: translateY(100%);
      }

      &.open {
        .offcanvas-overlay {
          transform: translateX(0%);
        }
      }
    }
  }
}
</style>
