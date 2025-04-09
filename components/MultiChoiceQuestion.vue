<template>
  <ContainerComponent>
    <HeaderComponent :text="title.text" :classes="title.classes" />
    <ListComponent :on-select="handleSelect" :options="options" />
    <FooterComponent
      :disabled-next="disabled"
      @click-next="navigate('next')"
      @click-prev="navigate('prev')"
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

const funnelStore = useFunnelStore();
const { onSelect, options: initialOptions, navigate, title } = funnelStore;

const options = ref(initialOptions);
const disabled = computed(() =>
  options.value.every((option) => !option.selected),
);

const handleSelect = (selectedOption: Option) => {
  options.value = options.value.map((option) => ({
    ...option,
    selected:
      option.value === selectedOption.value
        ? !option.selected
        : option.selected,
  }));

  const selectedOptions = options.value
    .filter((option) => option.selected)
    .map((option) => option.value);

  onSelect(selectedOptions);
};
</script>
