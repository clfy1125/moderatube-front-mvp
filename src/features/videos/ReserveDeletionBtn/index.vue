<script setup lang="ts">
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';

defineOptions({ name: 'ReserveDeletionBtn' });
defineEmits(['open-reserve-deletion-modal']);
</script>

<template>
  <TextBtn text="스팸 삭제 예약" class-name="second" @click="$emit('open-reserve-deletion-modal')" />
</template>

<style lang="scss" scoped></style>
