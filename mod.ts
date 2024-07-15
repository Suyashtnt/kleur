import * as palettes from "./palettes.ts";
import { colorsToTheme, convertPaletteToColors } from "./generate.ts";

const darkColors = convertPaletteToColors(palettes.dark, {
  primary: "purple",
  secondary: "blue",
});
export const dark = colorsToTheme(
  {
    name: "Dark",
    baseShade: 500,
    brightShade: 700,
    polarity: "dark",
  },
  darkColors,
  {
    lightness: 1,
    contrast: 1,
    saturation: 100,
  },
  (background) => ({
    background,
    surface: background.set("oklch.l", 0.16),
    overlay: background.set("oklch.l", 0.23),
  }),
);

const lightColors = convertPaletteToColors(palettes.light, {
  // I prefer blue as the primary color in light themes. Deal with it:tm:
  primary: "blue",
  secondary: "purple",
});
export const light = colorsToTheme(
  {
    name: "Light",
    baseShade: 400,
    brightShade: 500,
    polarity: "light",
  },
  lightColors,
  {
    lightness: 95,
    contrast: 1.4,
    saturation: 100,
  },
  (background) => ({
    background,
    surface: background.darken(0.08),
    overlay: background.darken(0.16),
  }),
);
