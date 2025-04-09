import {
  COOKIE_SCREEN_ID,
  COOKIE_FUNNEL_TYPE,
  COOKIE_CHOOSES,
} from "~/constants/cookies";
import { getInitialFunnel } from "~/utils/getInitialFunnel";
import type { Funnel } from "~/types/funnel";
import { getConfigByType } from "~/utils/getConfigByType";
import { getInitialScreenId } from "~/utils/getInitialScreenId";
import { FIRST_SCREEN_INDEX } from "~/constants/common";
import type { Chooses } from "~/types/chooses";
import { getInitialChooses } from "~/utils/getInitialChooses";
import { initialState } from "~/constants/state";

export function useFunnelStore() {
  const state = reactive(initialState);

  const funnelCookie = useCookie<Funnel | null>(COOKIE_FUNNEL_TYPE);
  const choosesCookie = useCookie<Chooses>(COOKIE_CHOOSES);
  const screenIdCookie = useCookie<string>(COOKIE_SCREEN_ID);

  const initializeFunnel = () => {
    const storedFunnel = unref(funnelCookie);
    state.funnel = storedFunnel || getInitialFunnel();
    if (!storedFunnel) funnelCookie.value = state.funnel;
  };

  const initializeChooses = () => {
    const storedChooses = unref(choosesCookie);
    state.chooses = storedChooses || getInitialChooses();
    if (!storedChooses) choosesCookie.value = state.chooses;
  };

  const initializeScreenId = () => {
    const storedScreenId = unref(screenIdCookie);
    state.screenId = storedScreenId || getInitialScreenId();
    if (!storedScreenId) screenIdCookie.value = state.screenId;
  };

  initializeFunnel();
  initializeChooses();
  initializeScreenId();

  const getCurrentConfig = () => {
    if (!state.funnel) throw new Error("Funnel type is not defined.");
    return getConfigByType(state.funnel);
  };

  const activeScreen = computed(() => {
    const currentConfig = getCurrentConfig();
    return currentConfig.screens.find((screen) => screen.id === state.screenId);
  });

  const navigate = (type: "prev" | "next") => {
    const config = getCurrentConfig();
    const currentIndex = config.screens.findIndex(
      (screen) => screen.id === state.screenId,
    );
    const newIndex = currentIndex + (type === "prev" ? -1 : 1);

    if (config.screens[newIndex]) {
      state.screenId = config.screens[newIndex].id;
      screenIdCookie.value = state.screenId;
      navigateTo(`/s/${state.screenId}`);
    } else {
      Object.assign(state, initialState);
      screenIdCookie.value = FIRST_SCREEN_INDEX;
      choosesCookie.value = {};
      navigateTo("/finish");
    }
  };

  const title = computed(
    () => activeScreen.value?.props?.title ?? { text: "No title" },
  );

  const component = computed(
    () => activeScreen.value?.component ?? "Not Found",
  );

  const onSelect = (values: string[]) => {
    state.chooses = {
      ...state.chooses,
      [state.screenId]: values,
    };
    choosesCookie.value = state.chooses;
  };

  const options = computed(
    () =>
      activeScreen.value?.props?.options?.map((option) => ({
        ...option,
        selected:
          state.chooses?.[state.screenId]?.includes(option.value) ?? false,
      })) ?? [],
  );

  return {
    title,
    component,
    options: options.value,
    chooses: state.chooses,
    navigate,
    onSelect,
  };
}
