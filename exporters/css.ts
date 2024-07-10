import { Theme } from "@adobe/leonardo-contrast-colors";
import { objectEntries } from "../lib.ts";

export const toCss = (theme: Theme) =>
  objectEntries(theme.contrastColorPairs)
    .map(([name, color]) => `--${name}: ${color};`)
    .map((line) => line.replace("deg", ""))
    .join("\n");
