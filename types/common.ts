export type Option = {
  title: string;
  value: string;
  selected?: boolean;
};

export type Title = {
  text: string;
  classes?: string;
};

export type Component =
  | "LandingV1"
  | "LandingV2"
  | "SingleChoiceQuestion"
  | "MultiChoiceQuestion";
