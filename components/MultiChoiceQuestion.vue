<template>
  <ContainerComponent>
    <HeaderComponent :text="title.text" :classes="title.classes" />
    <ListComponent :on-select="handleSelect" :options="options" />
    <FooterComponent
      :on-click-next="() => navigate('next')"
      :on-click-prev="() => navigate('prev')"
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

const { onSelect, options: initialOptions, navigate, title } = useFunnelStore();

const options = ref(initialOptions);
const disabled = ref(initialOptions.every((option) => !option.selected));

const handleSelect = (selectedOption: Option) => {
  options.value = options.value.map((option) => ({
    ...option,
    selected:
      selectedOption.value === option.value
        ? !option.selected
        : option.selected,
  }));
  disabled.value = false;
  const selectedOptions = options.value
    .filter((option) => option.selected)
    .map((option) => option.value);
  onSelect(selectedOptions);
};
</script>
