import { Theme } from "../palettes.ts";
import { toMustache } from "./mustache.ts";

export const toHelixTheme = async (theme: Theme) => {
  const template = await Deno.readTextFile("templates/helix.mustache");
  return toMustache(theme, template);
};
