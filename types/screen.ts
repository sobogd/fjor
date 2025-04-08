import type { Component, Option, Title } from "~/types/common";

export type ScreenProps = {
  title: Title;
  options?: Option[];
};

export type Screen = {
  id: string;
  component: Component;
  props: ScreenProps;
};
