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
  },
  darkColors,
  {
    lightness: 1,
    contrast: 1,
    saturation: 100,
  },
  (background) => ({
    background,
    surface: background.set("oklch.l", 0.15),
    overlay: background.set("oklch.l", 0.2),
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
    baseShade: 300,
    brightShade: 400,
  },
  lightColors,
  {
    lightness: 95,
    contrast: 2,
    saturation: 100,
  },
  (background) => ({
    background,
    surface: background.darken(0.05),
    overlay: background.darken(0.1),
  }),
);

export * from "./exporters/mod.ts";
