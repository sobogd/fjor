<template>
  <div class="flex flex-row-reverse justify-between items-center w-full">
    <ButtonComponent
      v-if="showNext"
      title="Continue"
      variant="contained"
      :disabled="disabledNext"
      @click="onClickNext"
    />
    <ButtonComponent
      v-if="showPrev"
      title="Back"
      variant="outlined"
      :disabled="disabledPrev"
      @click="onClickPrev"
    />
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "~/components/ButtonComponent.vue";

defineProps({
  disabledNext: {
    type: Boolean,
    default: false,
  },
  disabledPrev: {
    type: Boolean,
    default: false,
  },
  showNext: {
    type: Boolean,
    default: true,
  },
  showPrev: {
    type: Boolean,
    default: true,
  },
  onClickNext: {
    type: Function,
    default: () => {},
  },
  onClickPrev: {
    type: Function,
    default: () => {},
  },
});
</script>
