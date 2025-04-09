<template>
  <span
    class="font-semibold px-4 py-2 rounded-lg transition-colors duration-150"
    :class="[
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      variant === 'outlined'
        ? 'bg-transparent text-gray-300 border border-gray-300 hover:bg-gray-100 hover:text-gray-600'
        : 'bg-gray-300 text-gray-900 border border-gray-300 hover:bg-gray-400 hover:text-gray-800',
      fullWidth ? 'w-full' : 'w-auto',
    ]"
    role="button"
    :aria-disabled="disabled"
    @click="handleClick"
  >
    {{ title }}
  </span>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const { disabled, onClick } = defineProps({
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
  fullWidth: {
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

const handleClick = () => {
  if (!disabled) onClick();
};
</script>
