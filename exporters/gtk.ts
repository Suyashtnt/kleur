import { Theme } from "../palettes.ts";
import { toMustache } from "./mustache.ts";

export const toGtk3Theme = async (theme: Theme) => {
  const template = await Deno.readTextFile("templates/gtk-3.mustache");
  return toMustache(theme, template);
};

export const toGtk4Theme = async (theme: Theme) => {
  const template = await Deno.readTextFile("templates/gtk-4.mustache");
  return toMustache(theme, template);
};
