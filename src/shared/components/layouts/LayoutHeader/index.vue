<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import { useRoute } from 'vue-router';

import SelectChannel from '@/features/channel/SelectChannel/index.vue';
import SideBar from '@/shared/components/layouts/SideBar/index.vue';
import OffCanvas from '@/shared/components/OffCanvas/index.vue';

defineOptions({ name: 'LayoutHeader' });
defineEmits(['select']);

const route = useRoute();
const setPageName = () => {
  switch (route.path) {
    default:
    case '/app':
      return {
        name: '대시보드',
        value: 'dashboard'
      };
    case '/app/channel-management':
    case '/app/comment-management':
      return {
        name: '채널관리',
        value: 'channel'
      };
    case '/app/profile':
    case '/app/history':
      return {
        name: '마이페이지',
        value: 'profile'
      };
  }
};

const sideBar = ref<boolean>(false);
const toggleSideBar = (state: boolean) => (sideBar.value = state);

const handleHideSideBar = () => {
  if (window.innerWidth > 1024) toggleSideBar(false);
};

onMounted(() => window.addEventListener('resize', handleHideSideBar));
onUnmounted(() => window.removeEventListener('resize', handleHideSideBar));
</script>

<template>
  <div class="main-layout-header">
    <div class="logo"></div>

    <div class="select-part">
      <div class="title">
        <div :class="`title-icon ${setPageName().value}`"></div>
        <span> {{ setPageName().name }}</span>
      </div>

      <SelectChannel :hidden="$route.path === '/app/profile' || $route.path === '/app/history'" />

      <button class="sidebar-btn" @click="() => toggleSideBar(true)"></button>
    </div>
  </div>

  <!-- 테블릿 사이즈 이하 사이드바 처리 -->
  <OffCanvas class-name="mobile" :is-open="sideBar" :close-offcanvas="() => toggleSideBar(false)">
    <SideBar :close-offcanvas="() => toggleSideBar(false)" />
  </OffCanvas>
</template>

<style lang="scss" scoped>
.main-layout-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 20px;
  height: 72px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: $gray_2;

  @include tablet {
    height: 48px;
    gap: 20px;
    padding-left: 14px;
    padding-right: 10px;
    justify-content: space-between;
  }

  .logo {
    flex-shrink: 0;
    width: 170px;
    height: 62px;

    background-repeat: no-repeat;
    background-position: center;
    background-image: url('@/shared/assets/logo-icon.png');

    @include tablet {
      width: 123px;
      height: 30px;

      background-image: url('@/shared/assets/logo-icon mobile.png');
    }
  }

  .select-part {
    display: flex;
    align-items: center;
    gap: 30px;

    @include tablet {
      gap: 10px;
    }

    .title {
      display: flex;
      align-items: center;
      gap: 10px;

      @include tablet {
        display: none;
      }

      .title-icon {
        width: 14px;
        height: 14px;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('@/shared/assets/dashboard-bright-icon.svg');

        &.channel {
          background-image: url('@/shared/assets/channel-setting-bright-icon.svg');
        }

        &.profile {
          width: 24px;
          height: 24px;
          background-image: url('@/shared/assets/profile-icon.svg');
        }
      }

      span {
        @include fontStyle(16px, 600, $white);
      }
    }

    .sidebar-btn {
      display: none;
      width: 24px;
      height: 24px;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('@/shared/assets/sidebar-icon.svg');
      background-color: transparent;

      @include tablet {
        display: block;
      }
    }
  }
}

.offcanvas {
  display: none;

  &.mobile {
    @include tablet {
      display: block;
    }
  }
}
</style>
