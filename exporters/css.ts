import { Theme as LeonardoTheme } from "@adobe/leonardo-contrast-colors";
import { objectEntries } from "../lib.ts";
import { Theme } from "../palettes.ts";

/**
 * Converts an theme to a CSS string
 * @param theme A theme
 * @returns A CSS string
 */
export const toCss = (inputTheme: Theme) => {
  const theme = new LeonardoTheme({
    colors: inputTheme.theme.colors,
    backgroundColor: inputTheme.theme.backgroundColor,
    contrast: inputTheme.theme.contrast,
    formula: inputTheme.theme.formula,
    lightness: inputTheme.theme.lightness,
    saturation: inputTheme.theme.saturation,
    output: "LCH",
  });

  const backgroundStr = objectEntries(inputTheme.backgrounds)
    .map(([name, color]) => [name, color.lch()])
    .map(([name, [l, c, h]]) => `--${name}: lch(${l}, ${c}, ${h});`);

  const themeStr = objectEntries(theme.contrastColorPairs)
    .map(([name, color]) => `--${name}: ${color};`)
    .map((line) => line.replace("deg", ""))
    .join("\n");

  return `:root {
  ${backgroundStr.join("\n")}
  ${themeStr}
}`;
};
