import { render } from "mustache";
import { toHex } from "./hex.ts";
import { Theme } from "../palettes.ts";

export const toZedTheme = async (theme: Theme) => {
  const template = await Deno.readTextFile("templates/zed-theme.mustache");
  const hex = toHex(theme);

  return render(template, {
    "scheme-name": "Kleur",
    ...hex,
  });
};

export const toZedThemes = async (themes: Record<string, Theme>) => {
  throw new Error("Not implemented");
};
