<template>
  <ul class="w-full flex flex-col gap-3" role="list">
    <li
      v-for="option in options"
      :key="option.value"
      class="flex w-full justify-stretch items-stretch"
      role="listitem"
    >
      <ButtonComponent
        :title="option.title"
        :variant="option.selected ? 'contained' : 'outlined'"
        :full-width="true"
        @click="() => onSelect(option)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Option } from "~/types/common";
import ButtonComponent from "~/components/ButtonComponent.vue";

defineProps({
  options: {
    type: Array as PropType<Option[]>,
    required: true,
    validator: (value: Option[]) =>
      Array.isArray(value) &&
      value.every(
        (option) =>
          "value" in option && "title" in option && "selected" in option,
      ),
  },
  onSelect: {
    type: Function as PropType<(option: Option) => void>,
    required: true,
  },
});
</script>
