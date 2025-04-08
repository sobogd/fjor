import { Funnel } from "~/types/funnel";
import { baseline, experimental } from "~/constants/config";

export const getConfigByType = (type: Funnel) => {
  switch (type) {
    case Funnel.Baseline:
      return baseline;
    default:
      return experimental;
  }
};
