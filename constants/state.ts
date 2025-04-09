import type { Funnel } from "~/types/funnel";
import type { Chooses } from "~/types/chooses";
import { FIRST_SCREEN_INDEX } from "~/constants/common";

export const initialState = {
  funnel: null as Funnel | null,
  chooses: {} as Chooses,
  screenId: FIRST_SCREEN_INDEX,
};
