import { COOKIE_SCREEN_ID } from "~/constants/cookies";
import { FIRST_SCREEN_INDEX } from "~/constants/common";

export default defineNuxtRouteMiddleware((page) => {
  const cookieStore = useCookie<string>(COOKIE_SCREEN_ID);
  const screenId = cookieStore.value || FIRST_SCREEN_INDEX;
  const { id: urlScreenId } = page.params;

  if (page.name === "finish") return;

  if (urlScreenId) {
    if (urlScreenId === FIRST_SCREEN_INDEX) {
      return navigateTo("/");
    }
    if (urlScreenId !== screenId) {
      return navigateTo(`/s/${screenId}`);
    }
  } else if (screenId !== FIRST_SCREEN_INDEX) {
    return navigateTo(`/s/${screenId}`);
  }
});
