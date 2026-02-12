<script lang="ts" setup>
import { ref } from 'vue';

export interface IModalProps {
  showModal: boolean;
}

interface IBaseModalProps extends IModalProps {
  className?: string;
}
const props = defineProps<IBaseModalProps>();
const emit = defineEmits(['close']);
defineOptions({ name: 'BaseModal' });

const mouseDownTarget = ref<EventTarget | null>(null);
const handleMouseDown = (e: MouseEvent) => (mouseDownTarget.value = e.target);
const handleMouseUp = (e: MouseEvent) => {
  if (mouseDownTarget.value === e.currentTarget) emit('close');
};
</script>

<template>
  <Transition name="modal">
    <div v-if="showModal" class="modal-bg" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
      <div :class="['modal-overlay', props.className]" @click.stop @mousedown.stop @mouseup.stop @mousedown="handleMouseDown">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-bg {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;

  &:has(.alert) {
    z-index: 9999;
  }
}

.modal-overlay {
  margin: auto;
  border-radius: 2px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

/*
 * 다음 스타일들은 Vue.js에 의해
 * transition="modal"이 적용된 요소에 자동으로 적용됩니다.
 * 요소의 가시성이 토글될 때 사용됩니다.
 *
 * 이 스타일을 수정하여 모달 전환 효과를
 * 쉽게 조정할 수 있습니다.
*/
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-overlay,
.modal-leave-to .modal-overlay {
  /* 
    -webkit-transform: scale(1.1);
    transform: scale(1.1); 
  */
}
</style>
