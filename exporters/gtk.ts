import { Theme } from "../palettes.ts";
import { toMustache } from "./mustache.ts";

export const toGtkTheme = async (theme: Theme) => {
  const template = await Deno.readTextFile("templates/gtk.mustache");
  return toMustache(theme, template);
};
