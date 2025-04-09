<template>
  <h1 v-if="text" class="text-2xl w-full text-left" :class="classes">
    {{ text }}
  </h1>
</template>

<script setup lang="ts">
defineProps({
  classes: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
});
</script>
