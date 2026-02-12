<script setup lang="ts">
import { ref, watch } from 'vue';

import BaseSelect from '@/shared/components/inputs/BaseSelect/index.vue';

import { EVideoOption } from './enum';

interface ISelectVideoOptionProps {
  sort: EVideoOption;
  disabled: boolean;
}

const props = defineProps<ISelectVideoOptionProps>();
defineOptions({ name: 'SelectVideoOption' });
const emit = defineEmits<{
  (e: 'on-select-sort', option: { sort: EVideoOption; is_bookmarked?: boolean }): void;
}>();

const OPTIONS = [
  {
    label: '최신순',
    value: EVideoOption.published_at
  },
  {
    label: '인기순',
    value: EVideoOption.view_count
  },
  {
    label: '관심영상',
    value: 'is_bookmarked'
  }
];

const selectedValue = ref(props.sort);
watch(selectedValue, (newValue: EVideoOption | string) => {
  if (newValue === 'is_bookmarked') emit('on-select-sort', { sort: EVideoOption.published_at, is_bookmarked: true });
  else emit('on-select-sort', { sort: newValue as EVideoOption, is_bookmarked: undefined });
});
</script>

<!-- 
  최신순: 모든 영상을 최신순으로 나열
  인기순: 모든 영상을 인기순으로 나열
  관심영상: 관심영상만 최신순으로 나열
-->

<template>
  <div class="select-video-option">
    <BaseSelect v-model="selectedValue" :options="OPTIONS" :disabled="disabled" />
  </div>
</template>

<style lang="scss">
.select-video-option {
  width: 90px;
  position: relative;

  @include tablet {
    flex-shrink: 0;
  }

  .vue-select {
    .control {
      min-height: 30px;
      border-color: $gray_c;
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
