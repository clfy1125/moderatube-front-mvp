<script setup lang="ts">
import { checkMobile } from '@/shared/utils/checkMobile';

interface IIOSScrollHintProps {
  hidden: boolean;
}

defineProps<IIOSScrollHintProps>();
defineOptions({ name: 'IOSScrollHint' });
</script>

<template>
  <div v-if="checkMobile() === 'ios'" :class="`ios-scroll-hint ${hidden}`"></div>
</template>

<style lang="scss" scoped>
.ios-scroll-hint {
  display: none;

  @include mobile {
    display: block;
    position: absolute;
    width: 65px;
    height: 100%;
    background: linear-gradient(to right, transparent, $white);
    pointer-events: none;

    &.true {
      display: none;
    }
  }
}
</style>
