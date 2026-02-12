<script setup lang="ts">
import { ref, watch } from 'vue';

import BaseSelect from '@/shared/components/inputs/BaseSelect/index.vue';

import { ECommentOption } from './enum';

interface ISelectCommentOptionProps {
  option: ECommentOption;
  disabled: boolean;
}

type SelectCommentOptionEmits = {
  (e: 'on-select-option', value: ECommentOption): void;
};

const props = defineProps<ISelectCommentOptionProps>();
const emit = defineEmits<SelectCommentOptionEmits>();
defineOptions({ name: 'SelectCommentOption' });

const OPTIONS = [
  {
    label: '최신순',
    value: ECommentOption.new
  },
  {
    label: '정상',
    value: ECommentOption.normal
  },
  {
    label: '스팸',
    value: ECommentOption.spam
  }
];

const selected = ref(props.option);
watch(selected, () => emit('on-select-option', selected.value));
</script>

<template>
  <div class="select-comment-option">
    <BaseSelect v-model="selected" :options="OPTIONS" :disabled="disabled" />
  </div>
</template>

<style lang="scss">
.select-comment-option {
  width: 90px;
  position: relative;

  .vue-select {
    .control {
      min-height: 30px;
      border-color: $gray_c;
      border-radius: 2px;
      cursor: pointer;

      &.disabled {
        background-color: $gray_c;
      }

      &.focused {
        border-color: $gray_c;
        box-shadow: none;
      }

      .value-container {
        padding: 0 0 0 10px;
        white-space: nowrap;

        @include fontStyle(12px, 400, $gray_3);

        .single-value {
          user-select: none;

          @include fontStyle(12px, 400, $gray_3);
        }

        .search-input {
          display: none;
        }
      }

      .indicators-container {
        padding: 0 10px 0 0;

        .dropdown-icon {
          width: 10px;
          height: 10px;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url('@/shared/assets/select-arrow-icon.svg');

          svg {
            display: none;
          }

          &:disabled {
            cursor: default;
            opacity: 0.4;
          }
        }
      }

      &.disabled {
        cursor: default;
        opacity: 0.4;
      }
    }

    .menu {
      border-color: $gray_c;

      .menu-option {
        @include fontStyle(12px, 400);

        &.focused {
          background-color: transparent;
        }

        &:hover {
          background-color: $gray_e;
        }

        &.selected {
          opacity: 0.4;
          background-color: transparent;
        }
      }
    }
  }
}
</style>
