<script setup lang="ts">
import { computed } from 'vue';

import { useRouter } from 'vue-router';

import { VideoItem } from '../types/VideItem';

import DesktopSize from './desktopSize.vue';
import MobileSize from './mobileSize.vue';
import { IVideoTableCommonProps } from './utils/videoTableCommonProps';

const props = defineProps<IVideoTableCommonProps>();
const emit = defineEmits<{ (e: 'update:checked-ids', ids: string[]): void }>();
defineOptions({ name: 'VideosTable' });

const router = useRouter();

// 부모의 checkedIds를 프록시로 연결 (v-model 대상)
const checkedIds = computed<string[]>({
  get: () => props.checkedIds,
  set: (ids) => emit('update:checked-ids', ids)
});

const toggleHeadCheckbox = (state: boolean) => {
  if (state) checkedIds.value = Array.from(props.items.map((item) => item.video_id));
  else checkedIds.value = [];
};

const toggleRowCheckbox = (id: string, state: boolean) => {
  const set = new Set(checkedIds.value);

  if (state) set.add(id);
  else set.delete(id);

  checkedIds.value = Array.from(set);
};

const goToCommentManagement = (item: VideoItem) => router.push({ name: 'CommentManagement', params: { id: item.video_id } });
</script>

<template>
  <DesktopSize :is-pending="isPending" :checked-ids="checkedIds" :items="items" :offset="offset" @on-toggle-head-checkbox="toggleHeadCheckbox" @on-toggle-row-checkbox="toggleRowCheckbox" @on-select-video="goToCommentManagement" />
  <MobileSize :is-pending="isPending" :checked-ids="checkedIds" :items="items" :offset="offset" @on-toggle-head-checkbox="toggleHeadCheckbox" @on-toggle-row-checkbox="toggleRowCheckbox" @on-select-video="goToCommentManagement" />
</template>

<style lang="scss" scoped></style>
