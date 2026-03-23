<script setup lang="ts">
import { inject } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import { IGetAuthMeRes } from '@/features/auth/api/getAuthme';
import ProfileBtn from '@/features/user/ProfileBtn/index.vue';

interface ISideBarProps {
  closeOffcanvas?: () => void;
}

const props = defineProps<ISideBarProps>();
defineOptions({ name: 'SideBar' });

const route = useRoute();
const router = useRouter();

const userInfo: IGetAuthMeRes | undefined = inject('userInfo');

const goTo = (isDismissable: boolean, path: string) => {
  if (isDismissable) return props.closeOffcanvas?.();

  router.push(path);
  props.closeOffcanvas?.();
};

const onClickDashboardBtn = () => {
  goTo(route.path === '/app', '/app');
};

const onClickChannelManageBtn = () => {
  if (route.path.includes('/app/comment-management')) {
    router.replace('/app/channel-management');
  } else {
    goTo(route.path === '/app/channel-management', '/app/channel-management');
  }
};
</script>

<template>
  <aside class="sidebar">
    <div class="btns-part">
      <button :class="`btn ${$route.path === '/app' && 'active'}`" @click="onClickDashboardBtn">
        <div class="icon icon-dashboard"></div>
        대시보드
      </button>
      <button :class="`btn ${($route.path === '/app/channel-management' || $route.path.includes('/app/comment-management')) && 'active'}`" @click="onClickChannelManageBtn">
        <div class="icon icon-channel-setting"></div>
        채널 관리
      </button>
    </div>
    <ProfileBtn :user-name="userInfo?.data.profile.display_name || ''" :user-thumbnail="userInfo?.data.profile.thumbnail || ''" @click="goTo($route.path === '/app/profile', '/app/profile')" />
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 190px;
  height: 100%;
  background-color: $gray_e;

  @include tablet {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
  }

  .btns-part {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid $gray_c;
    background-color: transparent;

    .btn {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      height: 34px;
      padding: 10px;
      border-radius: 2px;
      text-align: left;
      transition: ease color 0.2s;
      background-color: transparent;

      @include fontStyle(12px, 600, $gray_3);

      .icon {
        width: 14px;
        height: 14px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        transition: opacity 0.2s;

        &-dashboard {
          background-image: url('@/shared/assets/dashboard-icon.svg');
        }

        &-channel-setting {
          background-image: url('@/shared/assets/channel-setting-icon.svg');
        }
      }

      &:hover {
        color: $gray_2;
        background-color: $gray_d;
      }

      &.active {
        color: $white;
        background-color: $key_color;

        .icon {
          opacity: 1;

          &-dashboard {
            background-image: url('@/shared/assets/dashboard-white-icon.svg');
          }

          &-channel-setting {
            background-image: url('@/shared/assets/channel-setting-white-icon.svg');
          }
        }
      }
    }
  }
}
</style>
