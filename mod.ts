import * as palettes from "./palettes.ts";
import { colorsToTheme, convertPaletteToColors } from "./generate.ts";

const darkColors = convertPaletteToColors(palettes.dark, {
  primary: "purple",
  secondary: "blue",
});
export const dark = colorsToTheme(
  {
    name: "Dark",
    baseShade: 600,
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
    background: background.set("oklch.l", 0.14).set("oklch.c", 0.03),
    surface: background.set("oklch.l", 0.16).set("oklch.c", 0.055),
    overlay: background.set("oklch.l", 0.20).set("oklch.c", 0.055),
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
    contrast: 1.5,
    saturation: 100,
  },
  (background) => ({
    background: background.set("oklch.l", 0.90).set("oklch.c", 0.035),
    surface: background.set("oklch.l", 0.87).set("oklch.c", 0.045),
    overlay: background.set("oklch.l", 0.84).set("oklch.c", 0.045),
  }),
);
