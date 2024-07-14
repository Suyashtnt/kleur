import { Theme } from "../palettes.ts";
import { toMustache } from "./mustache.ts";

export const toVscodeTheme = async (theme: Theme) => {
  const template = await Deno.readTextFile("templates/vscode.mustache");
  return toMustache(theme, template);
};
