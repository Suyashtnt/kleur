import { render } from "mustache";
import { toBase16 } from "./base16.ts";
import { fromObjectEntries, objectEntries } from "../lib.ts";
import { Theme } from "../palettes.ts";

export const toWindowsTerminalTheme = async (theme: Theme, name: string) => {
  const hex = toBase16(theme);
  const template = await Deno.readTextFile(
    "templates/windowsTerminal.mustache",
  );
  const colors: Record<
    `${string}-hex`,
    string
  > = fromObjectEntries(
    objectEntries(hex).map(([key, value]) => [
      key + "-hex" as `${string}-hex`,
      value.replace?.("#", ""),
    ]),
  );

  return render(template, {
    "scheme-name": name,
    ...colors,
  });
};
