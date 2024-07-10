import {
  RgbHexColor,
  Theme as LeonardoTheme,
} from "@adobe/leonardo-contrast-colors";
import { colorListToObj } from "../generate.ts";
import { BackgroundColors, Theme } from "../palettes.ts";
// @deno-types="npm:@types/chroma-js"
import chroma, { hex } from "chroma";

export const toHexTheme = (theme: LeonardoTheme) =>
  new LeonardoTheme({
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
): ReturnType<typeof colorListToObj> & BackgroundColors<RgbHexColor> => {
  const hexTheme = toHexTheme(theme.theme);

  const [_, ...colorList] = hexTheme.contrastColors;
  const colors = colorListToObj(colorList);

  return {
    background: theme.backgrounds.background.hex() as RgbHexColor,
    surface: theme.backgrounds.surface.hex() as RgbHexColor,
    overlay: theme.backgrounds.overlay.hex() as RgbHexColor,
    ...colors,
  };
};
