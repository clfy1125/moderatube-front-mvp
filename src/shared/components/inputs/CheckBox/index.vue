<script setup lang="ts">
defineOptions({ name: 'CheckBox' });

const props = defineProps<{ id: string }>();
const model = defineModel<boolean>({ default: false });
</script>

<template>
  <div class="checkbox" @click.stop="">
    <input :id="props.id" v-model="model" type="checkbox" />
    <label :htmlFor="props.id"></label>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  justify-content: center;

  input {
    appearance: none;
    width: 0;
  }

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;

    &::before {
      display: block;
      width: 16px;
      height: 16px;
      content: '';
      background: no-repeat center/contain url('@/shared/assets/checkbox-default-icon.svg');
      transition: ease background-image 0.2s;
    }
  }

  /* checked */
  input:checked + label::before {
    background-image: url('@/shared/assets/checkbox-checked-icon.svg');
  }

  /* hover */
  input:not(:checked, :disabled) + label:hover::before {
    background-image: url('@/shared/assets/checkbox-hover-icon.svg');
    opacity: 0.7;
  }

  input:disabled + label {
    opacity: 0.7;
  }
}
</style>
