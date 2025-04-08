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

export function useFunnelStore() {
  const funnel = ref<Funnel | null>(null);
  const funnelCookie = useCookie<Funnel | null>(COOKIE_FUNNEL_TYPE);

  function initializeFunnel() {
    if (!unref(funnelCookie)) {
      const initialFunnel = getInitialFunnel();
      funnelCookie.value = initialFunnel;
      funnel.value = initialFunnel;
    } else {
      funnel.value = unref(funnelCookie);
    }
  }

  initializeFunnel();

  const chooses = ref<Chooses>({});
  const choosesCookie = useCookie<Chooses>(COOKIE_CHOOSES);

  function initializeChooses() {
    if (!unref(choosesCookie)) {
      const initialChooses = getInitialChooses();
      choosesCookie.value = initialChooses;
      chooses.value = initialChooses;
    } else {
      chooses.value = unref(choosesCookie);
    }
  }

  initializeChooses();

  const screenId = ref<string>(FIRST_SCREEN_INDEX);
  const screenIdCookie = useCookie<string>(COOKIE_SCREEN_ID);

  function initializeScreenId() {
    if (!unref(screenIdCookie)) {
      const initialFunnelScreenId = getInitialScreenId();
      screenIdCookie.value = initialFunnelScreenId;
      screenId.value = initialFunnelScreenId;
    } else {
      screenId.value = unref(screenIdCookie);
    }
  }

  initializeScreenId();

  if (!unref(funnel)) {
    funnel.value = getInitialFunnel();
  }

  const getCurrentConfig = () => {
    if (!funnel.value) throw new Error();
    return getConfigByType(funnel.value);
  };

  const activeScreen = computed(() => {
    const currentConfig = getCurrentConfig();
    return currentConfig.screens.find((s) => s.id === screenId.value);
  });

  const reset = () => {
    screenIdCookie.value = FIRST_SCREEN_INDEX;
    funnelCookie.value = null;
    choosesCookie.value = {};
  };

  const navigate = (type: "prev" | "next") => {
    const config = getCurrentConfig();
    const oldIndex = config.screens.findIndex((s) => s.id === screenId.value);
    const newIndex = oldIndex - (type === "prev" ? 1 : -1);
    if (config.screens[newIndex]) {
      const newId = config.screens[newIndex].id;
      screenId.value = newId;
      const activeIdCookie = useCookie<string>(COOKIE_SCREEN_ID);
      activeIdCookie.value = newId;
      navigateTo("/s/" + newId);
    } else {
      reset();
      navigateTo("/finish");
    }
  };

  const title = computed(() => {
    return activeScreen.value?.props?.title ?? { text: "No title" };
  });

  const component = computed(() => {
    return activeScreen.value?.component ?? "Not Found";
  });

  const onSelect = (values: string[]) => {
    chooses.value = {
      ...chooses.value,
      [screenId.value]: values,
    };
    choosesCookie.value = chooses.value;
  };

  const options = computed(
    () =>
      activeScreen.value?.props?.options?.map((option) => ({
        ...option,
        selected: !!chooses.value?.[screenId.value]?.includes(option.value),
      })) ?? [],
  );

  return {
    title: title.value,
    component: component.value,
    options: options.value,
    chooses,
    navigate,
    onSelect,
  };
}
