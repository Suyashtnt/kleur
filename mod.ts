import * as palletes from "./palletes.ts";
import { convertPalleteToColors, colorsToTheme } from "./generate.ts";

const darkColors = convertPalleteToColors(palletes.dark, {
  primary: "purple",
  secondary: "blue",
});
export const dark = colorsToTheme(darkColors, {
  lightness: 4,
  contrast: 1,
  saturation: 100,
});

export * from "./exporters/mod.ts";
