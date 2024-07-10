import {
  BackgroundColor,
  Color,
  ContrastColor,
  ContrastColorValue,
  CssColor,
  Theme,
} from "@adobe/leonardo-contrast-colors";
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
      ratios: [1.45, 2.06, 2.95, 4.27, 6.05, 8.37, 11.34, 14.89],
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
      ratios: [1.45, 2.06, 2.95, 4.27, 6.05, 8.37, 11.34, 14.89],
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

type Shade = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
type ColorShades = Record<Shade, CssColor>;
type ColorObject = Record<
  | keyof CustomColors<Chroma.Color>
  | keyof KeyColors<Chroma.Color>,
  ColorShades
>;

export const colorListToObj = (colors: ContrastColor[]): ColorObject =>
  colors.reduce((acc, { name, values }) => {
    acc[name as keyof ColorObject] = values.reduce(
      (acc, { name: shadeName, value }) => {
        acc[Number(shadeName.replace(name, "")) as Shade] = value;
        return acc;
      },
      {} as ColorShades,
    );
    return acc;
  }, {} as ColorObject);
