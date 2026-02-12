<script setup lang="ts">
import { computed } from 'vue';

import VueSelect from 'vue3-select-component';

interface IBaseSelectProps {
  modelValue: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
}
const props = withDefaults(defineProps<IBaseSelectProps>(), {
  placeholder: ' ',
  disabled: false,
  isLoading: false
});

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();
defineOptions({ name: 'BaseSelect' });

const selected = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
});
</script>

<template>
  <VueSelect v-model="selected" :placeholder="placeholder" :options="options" :is-loading="isLoading" :is-clearable="false" :is-searchable="false" :is-disabled="disabled" />
</template>

<style lang="scss" scoped></style>
