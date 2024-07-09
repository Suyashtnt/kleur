import { Theme, Color, BackgroundColor } from "@adobe/leonardo-contrast-colors";
import { KeyColors } from "./palletes.ts";
import { Oklch } from "npm:@types/culori";
// @deno-types="npm:@types/culori"
import { formatHex } from "culori/fn";
import { objectEntries } from "./lib.ts";

export const convertPalleteToColors = (
  pallete: KeyColors<Oklch>,
  extraKeys: Record<string, keyof KeyColors<Oklch>>,
) => {
  const asColor = (name: string, oklch: Oklch): Color => {
    return new Color({
      name,
      colorKeys: [formatHex(oklch)],
      ratios: [1.45, 2.05, 3.02, 4.54, 7, 10.86],
      colorspace: "OKLCH",
      smooth: true,
    });
  };

  const asBackground = (name: string, oklch: Oklch): BackgroundColor => {
    return new BackgroundColor({
      name,
      colorKeys: [formatHex(oklch)],
      ratios: [1.45, 2.05, 3.02, 4.54, 7, 10.86],
      colorspace: "OKLCH",
      smooth: true,
    });
  };

  const colors = objectEntries(pallete).map(([name, oklch]) =>
    asColor(name, oklch),
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
    formula: "wcag3",
  });
};
