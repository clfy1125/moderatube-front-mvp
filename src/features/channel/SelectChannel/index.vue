<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import { useGetGoogleOAuthURL } from '@/features/auth/api/getGoogleOAuthURL';
import BaseSelect from '@/shared/components/inputs/BaseSelect/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { useChannelIdStore } from '@/shared/store/useChannelIdStore';
import { useVideosQueryParamsStore } from '@/shared/store/useChannelQueryStore';
import { Err } from '@/shared/types/Error';

import { useGetChannels } from '../api/getChannels';

interface ISelectChannelProps {
  hidden: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<ISelectChannelProps>(), { disabled: false });
defineOptions({ name: 'SelectChannel' });

const route = useRoute();
const router = useRouter();
const alertStore = useAlertStore();
const channelIdStore = useChannelIdStore();
const queryParamsStore = useVideosQueryParamsStore();

const { refetch: getChannels, data: channels, isLoading } = useGetChannels();
const { data: googleOAuthUrlData, refetch: getGoogleOAuthURL } = useGetGoogleOAuthURL({ redirect_url: `${import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL : import.meta.env.VITE_DEPLOY}/auth/link` }); // 구글 OAuth 인증 URL

const items = ref<{ label: string; value: string }[]>([]);
const selected = ref<string>('');

const handleAnotherGoogleLogin = async () => {
  try {
    await getGoogleOAuthURL();
    if (googleOAuthUrlData.value === undefined) return;

    const authUrl = googleOAuthUrlData.value.data.auth_url;
    window.location.assign(authUrl);
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};

const handleGetChannels = async () => {
  try {
    await getChannels();
    if (channels.value === undefined) return;

    const list = channels.value.data.channels.map((item) => ({ label: item.channel_title || '', value: item.channel_id })) || [];
    items.value = list;
    if (items.value.length > 0 && !selected.value) selected.value = items.value[0].value;
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};

watch(selected, () => {
  // '채널 추가'를 선택했다면 새로운 로그인 시도로 간주
  if (selected.value === 'ADD_CHANNEL') return handleAnotherGoogleLogin();
  channelIdStore.changeChannelId(selected.value);

  if (route.path.includes('/app/comment-management')) {
    queryParamsStore.resetVideosQueryParams();
    router.replace({ name: 'ChannelManagement' });
  }
});

onMounted(handleGetChannels);
</script>

<template>
  <div :class="`select-channel ${hidden && 'hidden'}`">
    <BaseSelect v-model="selected" placeholder="채널을 선택해주세요." :options="[...items, { label: '채널 추가', value: 'ADD_CHANNEL' }]" :disabled="disabled" :is-loading="isLoading" />
    <div class="channel-icon"></div>
  </div>
</template>

<style lang="scss">
.select-channel {
  width: 240px;
  position: relative;

  &.hidden {
    visibility: hidden;
  }

  @include tablet {
    width: 170px;
  }

  .vue-select {
    .control {
      min-height: 36px;
      background-color: $gray_3;
      border: 1px solid $gray_7;
      border-radius: 2px;
      cursor: pointer;

      &.disabled {
        background-color: $gray_3;
      }

      &.focused {
        border-color: $gray_7;
        box-shadow: none;
      }

      .value-container {
        padding: 0 10px 0 38px;
        white-space: nowrap;

        @include fontStyle(12px, 400, $white);

        .single-value {
          height: 14px;
          user-select: none;

          @include fontStyle(12px, 400, $white);
        }

        .search-input {
          display: none;
        }
      }

      .indicators-container {
        padding: 0 14px 0 0;

        .dropdown-icon {
          width: 10px;
          height: 10px;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url('@/shared/assets/select-arrow-white-icon.svg');

          svg {
            display: none;
          }

          &:disabled {
            cursor: default;
            opacity: 0.2;
          }
        }
      }
    }

    .menu {
      background-color: $gray_3;
      border: 1px solid $gray_7;
      border-radius: 2px;

      .menu-option {
        position: relative;
        display: block;
        padding-left: 38px;
        height: 36px;
        align-content: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        @include fontStyle(12px, 400, $white);

        &.focused {
          background-color: transparent;
        }

        &:hover {
          background-color: $gray_5;
        }

        &.selected {
          opacity: 0.4;
          background-color: transparent;
        }

        &::after {
          position: absolute;
          left: 13px;
          content: url('@/shared/assets/channel-white-icon.svg');
        }

        &:last-of-type {
          text-align: center;
          padding-left: 0px;
          color: $gray_a;

          &::after {
            position: absolute;
            left: 50%;
            transform: translateX(-420%);
            content: url('@/shared/assets/plus-icon.svg');
          }
        }
      }

      .no-results {
        position: relative;
        display: block;
        padding-left: 10px;
        height: 30px;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        @include fontStyle(12px, 400, $white);
      }
    }
  }

  .channel-icon {
    position: absolute;
    top: 12px;
    left: 14px;
    width: 17px;
    height: 12px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url('@/shared/assets/channel-white-icon.svg');
  }
}
</style>
