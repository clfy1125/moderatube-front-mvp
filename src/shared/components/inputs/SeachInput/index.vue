<script setup lang="ts">
import { ref, watch } from 'vue';

import TextBtn from '@/shared/components/btns/TextBtn/index.vue';

interface ISearchInputProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
}
const props = withDefaults(defineProps<ISearchInputProps>(), {
  placeholder: '검색어를 입력해주세요.',
  disabled: false
});
defineEmits<{ (e: 'on-enter', value: string): void }>();
defineOptions({ name: 'SearchInput' });

const text = ref(props.value);

watch(
  () => props.value,
  () => (text.value = props.value)
);
</script>

<template>
  <form class="search-form" @submit.prevent="$emit('on-enter', text)">
    <div>
      <input v-model="text" class="search-input" :placeholder="placeholder" />
      <div class="magnifier-icon"></div>
    </div>
    <TextBtn text="검색" type="submit" class-name="second" :disabled="disabled" />
  </form>
</template>

<style lang="scss" scoped>
.search-form {
  display: flex;
  gap: 10px;

  & > div {
    position: relative;

    @include tablet {
      flex-grow: 1;
    }

    .search-input {
      width: 240px;
      height: 30px;
      border: 1px solid $gray_c;
      border-radius: 2px;
      padding-left: 28px;
      padding-right: 10px;

      overflow: hidden;
      text-overflow: ellipsis;

      @include fontStyle(12px, 400, $gray_3);

      @include tablet {
        width: 100%;
      }
    }

    .magnifier-icon {
      position: absolute;
      top: 9px;
      left: 10px;
      width: 14px;
      height: 14px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url('@/shared/assets/magnifier-icon.svg');
    }
  }

  .text-btn {
    height: 30px;

    @include tablet {
      flex-shrink: 0;
    }
  }
}
</style>
