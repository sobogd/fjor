<template>
  <ContainerComponent>
    <HeaderComponent :text="title.text" :classes="title.classes" />
    <FooterComponent :on-click-next="navigateToNext" :show-prev="false" />
  </ContainerComponent>
</template>

<script setup lang="ts">
import { useFunnelStore } from "~/stores/funnel";
import ContainerComponent from "~/components/ContainerComponent.vue";
import HeaderComponent from "~/components/HeaderComponent.vue";
import FooterComponent from "~/components/FooterComponent.vue";

const funnelStore = useFunnelStore();
const { navigate, title } = funnelStore;

function navigateToNext() {
  navigate("next");
}
</script>
