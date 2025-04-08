<template>
  <ul class="w-full flex flex-col gap-3">
    <ButtonComponent
      v-for="option in options"
      :key="option.value"
      :title="option.title"
      :variant="option.selected ? 'contained' : 'outlined'"
      :on-click="() => onSelect(option)"
    />
  </ul>
</template>

<script setup lang="ts">
import type { Option } from "~/types/common";
import ButtonComponent from "~/components/ButtonComponent.vue";

defineProps({
  options: {
    type: Array as PropType<Option[]>,
    required: true,
  },
  onSelect: {
    type: Function as PropType<(option: Option) => void>,
    required: true,
  },
});
</script>
