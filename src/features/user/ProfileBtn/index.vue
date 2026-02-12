<script setup lang="ts">
interface IProfileBtnProps {
  userName: string;
  userThumbnail: string;
}

defineProps<IProfileBtnProps>();
defineOptions({ name: 'ProfileBtn' });
defineEmits(['click']);
</script>

<template>
  <button class="profile-btn" @click="$emit('click')">
    <div class="profile-icon" :style="{ backgroundImage: `url(${userThumbnail})` }"></div>
    <div class="user-name">{{ userName }}</div>
  </button>
</template>

<style lang="scss" scoped>
.profile-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 16px 20px 16px 20px;
  background-color: transparent;

  .profile-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: 24px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url('@/shared/assets/profile-icon.svg');
  }

  .user-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    @include fontStyle(12px, 400, $gray_2);
  }
}
</style>
