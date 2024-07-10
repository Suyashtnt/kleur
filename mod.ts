import * as palletes from "./palletes.ts";
import { colorsToTheme, convertPalleteToColors } from "./generate.ts";

const darkColors = convertPalleteToColors(palletes.dark, {
  primary: "purple",
  secondary: "blue",
});
export const dark = colorsToTheme(darkColors, {
  lightness: 2,
  contrast: 1,
  saturation: 100,
});

const lightColors = convertPalleteToColors(palletes.light, {
  // I prefer blue as the primary colour in light themes. Deal with it:tm:
  primary: "blue",
  secondary: "purple",
});
export const light = colorsToTheme(lightColors, {
  lightness: 90,
  contrast: 1,
  saturation: 100,
});

export * from "./exporters/mod.ts";
