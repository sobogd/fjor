<template>
  <ContainerComponent>
    <HeaderComponent text="Finish" />
    <div class="text-lg text-left w-full mb-2 text-gray-400">
      If you want to start over, click the button below.
    </div>
    <FooterComponent
      :on-click-next="clickStartHandler"
      :show-prev="false"
      class="mt-4"
    />
  </ContainerComponent>
</template>

<script setup lang="ts">
import ContainerComponent from "~/components/ContainerComponent.vue";
import HeaderComponent from "~/components/HeaderComponent.vue";
import FooterComponent from "~/components/FooterComponent.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const clickStartHandler = () => {
  router.push("/");
};
</script>
