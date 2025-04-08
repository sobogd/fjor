<template>
  <div>
    <component :is="funnel.component" />
  </div>
</template>

<script setup lang="ts">
import { useFunnelStore } from "~/stores/funnel";

const funnel = useFunnelStore();
</script>
