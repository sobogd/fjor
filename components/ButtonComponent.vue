<template>
  <span
    class="font-semibold px-4 py-2 rounded-lg"
    :class="{
      'opacity-50 cursor-not-allowed': disabled,
      'cursor-pointer': !disabled,
      'bg-transparent text-gray-300 border border-gray-300':
        variant === 'outlined',
      'bg-gray-300 text-gray-900 border border-gray-300':
        variant === 'contained',
    }"
    @click="!disabled ? onClick() : undefined"
  >
    {{ title }}
  </span>
</template>

<script setup lang="ts">
defineProps({
  onClick: {
    type: Function,
    required: false,
    default: () => {},
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  variant: {
    type: String as PropType<"outlined" | "contained">,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>
