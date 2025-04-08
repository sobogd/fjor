export default defineNuxtPlugin((nuxtApp) => {
  const components = import.meta.glob("@/components/**/*.vue", { eager: true });
  Object.entries(components).forEach(([path, definition]) => {
    const componentName = path.split("/").pop()?.split(".")[0];
    if (
      componentName &&
      typeof definition === "object" &&
      definition &&
      "default" in definition
    ) {
      nuxtApp.vueApp.component(
        componentName,
        (definition as { default: object }).default,
      );
    }
  });
});
