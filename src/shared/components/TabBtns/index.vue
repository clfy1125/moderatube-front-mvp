<script setup lang="ts">
import TabBtn from '@/shared/components/btns/TabBtn/index.vue';

interface IProps {
  list: string[];
  tab: string;
}

const props = defineProps<IProps>();
defineOptions({ name: 'TabBtns' });

const emit = defineEmits<{ (e: 'on-select-tab', selectedTab: string): void }>();
const changeTab = (selectedTab: string) => emit('on-select-tab', selectedTab);
</script>

<template>
  <ul class="tabs-part">
    <li v-for="(item, index) in list" :key="index">
      <TabBtn :text="item" :active="tab === item" @click="changeTab(item)" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.tabs-part {
  display: flex;
  width: fit-content;
}
</style>
