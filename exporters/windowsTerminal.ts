import { render } from "mustache";
import { HumanPalette } from "../palletes.ts";
import { toHex } from "./hex.ts";

export const toWindowsTerminalTheme = async (pallete: HumanPalette) => {
  const hex = toHex(pallete);
  const template = await Deno.readTextFile(
    "templates/windowsTerminal.mustache",
  );
  const theme = Object.fromEntries(
    Object.entries(hex).map(([key, value]) => [
      key + "-hex",
      value.replace?.("#", ""),
    ]),
  );

  return render(template, {
    "scheme-name": "Kleur",
    ...theme,
  });
};
