<template>
  <div>
    <component :is="component" />
  </div>
</template>

<script setup lang="ts">
import { useFunnelStore } from "~/stores/funnel";

const funnel = useFunnelStore();
const component = funnel.component.value;
</script>
