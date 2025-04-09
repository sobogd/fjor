<template>
  <ContainerComponent>
    <HeaderComponent :text="title.text" :classes="title.classes" />
    <ListComponent :on-select="handleSelect" :options="options" />
    <FooterComponent
      :on-click-next="navigateToNext"
      :on-click-prev="navigateToPrev"
      :disabled-next="disabled"
    />
  </ContainerComponent>
</template>

<script setup lang="ts">
import { useFunnelStore } from "~/stores/funnel";
import type { Option } from "~/types/common";
import ContainerComponent from "~/components/ContainerComponent.vue";
import HeaderComponent from "~/components/HeaderComponent.vue";
import FooterComponent from "~/components/FooterComponent.vue";
import ListComponent from "~/components/ListComponent.vue";
import { computed, ref } from "vue";

const { onSelect, options: initialOptions, navigate, title } = useFunnelStore();

const options = ref<Option[]>(initialOptions);

const disabled = computed(() =>
  options.value.every((option) => !option.selected),
);

const handleSelect = (selectedOption: Option) => {
  options.value = options.value.map((option) => ({
    ...option,
    selected: selectedOption.value === option.value,
  }));
  onSelect([selectedOption.value]);
};

const navigateToNext = () => {
  if (!disabled.value) navigate("next");
};

const navigateToPrev = () => navigate("prev");
</script>
