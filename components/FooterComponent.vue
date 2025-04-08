<template>
  <div class="flex flex-row-reverse justify-between items-center w-full">
    <ButtonComponent
      v-if="showNext"
      title="Continue"
      variant="contained"
      :disabled="disabledNext"
      :on-click="onClickNext"
    />
    <ButtonComponent
      v-if="showPrev"
      title="Back"
      variant="outlined"
      :disabled="disabledPrev"
      :on-click="onClickPrev"
    />
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "~/components/ButtonComponent.vue";

defineProps({
  disabledNext: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabledPrev: {
    type: Boolean,
    required: false,
    default: false,
  },
  showNext: {
    type: Boolean,
    required: false,
    default: true,
  },
  showPrev: {
    type: Boolean,
    required: false,
    default: true,
  },
  onClickNext: {
    type: Function,
    required: false,
    default: () => {},
  },
  onClickPrev: {
    type: Function,
    required: false,
    default: () => {},
  },
});
</script>
