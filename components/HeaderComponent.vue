<template>
  <h1 class="text-2xl w-full text-left" :class="classes">
    {{ text }}
  </h1>
</template>

<script setup lang="ts">
defineProps({
  classes: {
    type: String,
    required: false,
    default: "",
  },
  text: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
