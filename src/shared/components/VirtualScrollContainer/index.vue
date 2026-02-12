<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface IVirtualScrollContainerProps {
  id: string;
  zeroPointPadding?: number;
}

const props = withDefaults(defineProps<IVirtualScrollContainerProps>(), {
  zeroPointPadding: 10
});
defineOptions({ name: 'VirtualScrollContainer' });

const contentRef = ref<HTMLDivElement | null>(null);
const thumbYRef = ref<HTMLDivElement | null>(null);
const thumbXRef = ref<HTMLDivElement | null>(null);

const updateThumb = () => {
  const content = contentRef.value;
  const thumbY = thumbYRef.value;
  const thumbX = thumbXRef.value;
  if (!content || !thumbY || !thumbX) return;

  const { clientHeight, scrollHeight, scrollTop, clientWidth, scrollWidth, scrollLeft } = content;

  // Y축
  if (scrollHeight <= clientHeight) {
    thumbY.style.display = 'none';
  } else {
    const thumbHeight = (clientHeight / scrollHeight) * clientHeight - props.zeroPointPadding * 3;
    const thumbTop = (scrollTop / scrollHeight) * clientHeight;
    thumbY.style.display = 'block';
    thumbY.style.height = `${thumbHeight}px`;
    thumbY.style.transform = `translateY(${thumbTop}px)`;
  }

  // X축
  if (scrollWidth <= clientWidth) {
    thumbX.style.display = 'none';
  } else {
    const thumbWidth = (clientWidth / scrollWidth) * clientWidth - props.zeroPointPadding * 3;
    const thumbLeft = (scrollLeft / scrollWidth) * clientWidth;
    thumbX.style.display = 'block';
    thumbX.style.width = `${thumbWidth}px`;
    thumbX.style.transform = `translateX(${thumbLeft}px)`;
  }
};

const initYDrag = () => {
  const content = contentRef.value;
  const thumbY = thumbYRef.value;
  if (!content || !thumbY) return;

  let isDragging = false;
  let startY = 0;
  let startScrollTop = 0;

  const onMouseDown = (e: MouseEvent) => {
    isDragging = true;
    startY = e.clientY;
    startScrollTop = content.scrollTop;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startY;
    const scrollRatio = content.scrollHeight / content.clientHeight;
    content.scrollTop = startScrollTop + deltaY * scrollRatio;
  };

  const onMouseUp = () => {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  thumbY.addEventListener('mousedown', onMouseDown);

  return () => thumbY.removeEventListener('mousedown', onMouseDown);
};

const initXDrag = () => {
  const content = contentRef.value;
  const thumbX = thumbXRef.value;
  if (!content || !thumbX) return;

  let isDraggingX = false;
  let startX = 0;
  let startScrollLeft = 0;

  const onMouseDownX = (e: MouseEvent) => {
    isDraggingX = true;
    startX = e.clientX;
    startScrollLeft = content.scrollLeft;
    document.addEventListener('mousemove', onMouseMoveX);
    document.addEventListener('mouseup', onMouseUpX);
    e.preventDefault();
  };

  const onMouseMoveX = (e: MouseEvent) => {
    if (!isDraggingX) return;
    const deltaX = e.clientX - startX;
    const scrollRatio = content.scrollWidth / content.clientWidth;
    content.scrollLeft = startScrollLeft + deltaX * scrollRatio;
  };

  const onMouseUpX = () => {
    isDraggingX = false;
    document.removeEventListener('mousemove', onMouseMoveX);
    document.removeEventListener('mouseup', onMouseUpX);
  };

  thumbX.addEventListener('mousedown', onMouseDownX);

  return () => thumbX.removeEventListener('mousedown', onMouseDownX);
};

onMounted(() => {
  updateThumb();

  window.addEventListener('resize', updateThumb);
  contentRef.value?.addEventListener('scroll', updateThumb);

  const cleanupY = initYDrag();
  const cleanupX = initXDrag();

  onUnmounted(() => {
    window.removeEventListener('resize', updateThumb);
    contentRef.value?.removeEventListener('scroll', updateThumb);

    cleanupY?.();
    cleanupX?.();
  });
});
</script>

<template>
  <div class="virtual-scroll-container">
    <div :id="props.id" ref="contentRef" class="scroll-content">
      <slot></slot>
    </div>
    <div ref="thumbYRef" class="scrollbar-thumb thumb-y"></div>
    <div ref="thumbXRef" class="scrollbar-thumb thumb-x"></div>
  </div>
</template>

<style lang="scss" scoped>
.virtual-scroll-container {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.scroll-content {
  box-sizing: content-box; // padding이 너비에 포함되지 않도록
  height: 100%; // 스크롤바 공간 확보
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: block;
    width: 0;
    height: 0;
  }
}

.scrollbar-thumb {
  position: absolute;
  background: rgba(105, 105, 105, 10%);
  backdrop-filter: blur(0.5px);
  border-radius: 4px;
  transition:
    transform 0.1s ease,
    height 0.1s ease;

  &.thumb-y {
    top: 10px;
    right: 6px;
    width: 8px;

    @include tablet {
      right: 4px;
      width: 6px;
    }
  }

  &.thumb-x {
    bottom: 6px;
    left: 10px;
    height: 8px;

    @include tablet {
      bottom: 3px;
      height: 6px;
    }
  }
}
</style>
