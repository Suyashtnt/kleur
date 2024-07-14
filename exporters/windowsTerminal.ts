import { Theme } from "../palettes.ts";
import { toMustache } from "./mustache.ts";

export const toWindowsTerminalTheme = async (theme: Theme) => {
  const template = await Deno.readTextFile(
    "templates/windowsTerminal.mustache",
  );
  return toMustache(theme, template);
};
