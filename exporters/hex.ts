import { Theme } from "@adobe/leonardo-contrast-colors";
import { colorListToObj } from "../generate.ts";

export const toHexTheme = (theme: Theme) =>
  new Theme({
    backgroundColor: theme.backgroundColor,
    colors: theme.colors,
    lightness: theme.lightness,
    contrast: theme.contrast,
    formula: theme.formula,
    saturation: theme.saturation,
    output: "HEX",
  });

export const toHex = (
  theme: Theme,
) => {
  const [background, ...colorList] = toHexTheme(theme).contrastColors;

  return {
    background,
    ...colorListToObj(colorList),
  };
};
