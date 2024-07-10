import { BackgroundColor, Color, Theme } from "@adobe/leonardo-contrast-colors";
import { CustomColors, KeyColors } from "./palletes.ts";
// @deno-types="npm:@types/chroma-js@2"
import Chroma from "chroma";
import { objectEntries } from "./lib.ts";

export const convertPalleteToColors = (
  pallete: KeyColors<Chroma.Color>,
  extraKeys: Record<
    keyof CustomColors<Chroma.Color>,
    keyof KeyColors<Chroma.Color>
  >,
) => {
  const asColor = (name: string, color: Chroma.Color): Color => {
    return new Color({
      name,
      // @ts-expect-error this works in chroma-js
      colorKeys: [color.hex()],
      ratios: [1.79, 2.61, 3.81, 5.56, 7.89, 10.8],
      colorspace: "OKLCH",
      smooth: true,
      output: "OKLCH",
    });
  };

  const asBackground = (name: string, color: Chroma.Color): BackgroundColor => {
    return new BackgroundColor({
      name,
      // @ts-expect-error this works in chroma-js
      colorKeys: [color.hex()],
      ratios: [1.79, 2.61, 3.81, 5.56, 7.89, 10.8],
      colorspace: "OKLCH",
      smooth: true,
      output: "OKLCH",
    });
  };

  const colors = objectEntries(pallete).map(([name, oklch]) =>
    asColor(name, oklch)
  );

  for (const [extraKey, value] of objectEntries(extraKeys)) {
    colors.push(asColor(extraKey, pallete[value]));
  }

  const backgroundColor = asBackground("base", pallete.base);

  return {
    colors,
    backgroundColor,
  };
};

export const colorsToTheme = (
  {
    colors,
    backgroundColor,
  }: { colors: Color[]; backgroundColor: BackgroundColor },
  {
    lightness,
    contrast,
    saturation,
  }: { lightness: number; contrast: number; saturation: number },
): Theme => {
  return new Theme({
    colors,
    backgroundColor,
    lightness,
    contrast,
    saturation,
    output: "LCH",
  });
};
