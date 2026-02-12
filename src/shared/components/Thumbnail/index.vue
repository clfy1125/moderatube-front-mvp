<script setup lang="ts">
interface IThumbnailImgProps {
  thumbnailUrl?: string;
}

defineProps<IThumbnailImgProps>();
defineOptions({ name: 'ThumbnailImg' });
</script>

<template>
  <div class="thumbnail">
    <div :style="{ backgroundImage: `url(${thumbnailUrl})` }"></div>
  </div>
</template>

<style lang="scss" scoped>
.thumbnail {
  div {
    width: 100%;
    height: 100%;
    background-color: '#f4f4f4';
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 4px;
  }
}
</style>
