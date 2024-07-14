import { Theme } from "../palettes.ts";
import { toMustache } from "./mustache.ts";

const toZedTheme = async (theme: Theme) => {
  const template = await Deno.readTextFile("templates/zed-theme.mustache");
  return toMustache(theme, template);
};

export const toZedThemes = async (themes: Theme[]) => {
  const template = await Deno.readTextFile("templates/zed.mustache");
  const themesString = await Promise.all(
    themes.map((theme) => toZedTheme(theme)),
  ).then((arr) => arr.join(",\n"));
  return template.replace("{{themes}}", themesString);
};
