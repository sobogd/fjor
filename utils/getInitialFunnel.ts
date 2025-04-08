import { Funnel } from "~/types/funnel";

const funnels: Funnel[] = [Funnel.Baseline, Funnel.Experimental];

export const getInitialFunnel = (): Funnel => {
  return funnels[Math.floor(Math.random() * funnels.length)];
};
