import {
  BackgroundColor,
  Color,
  ContrastColor,
  CssColor,
  Theme as LeonardoTheme,
} from "@adobe/leonardo-contrast-colors";
import {
  BackgroundColors,
  CustomColors,
  KeyColors,
  Theme,
} from "./palettes.ts";
// @deno-types="npm:@types/chroma-js@2"
import Chroma from "chroma";
import { objectEntries } from "./lib.ts";
import chroma from "chroma";

export const convertPaletteToColors = (
  palette: KeyColors<Chroma.Color>,
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

  const colors = objectEntries(palette).map(([name, oklch]) =>
    asColor(name, oklch)
  );

  for (const [extraKey, value] of objectEntries(extraKeys)) {
    colors.push(asColor(extraKey, palette[value]));
  }

  const backgroundColor = asBackground("base", palette.base);

  return {
    colors,
    backgroundColor,
  };
};

export const colorsToTheme = (
  {
    name,
    baseShade,
    brightShade,
  }: { name: string; baseShade: Shade; brightShade: Shade },
  {
    colors,
    backgroundColor,
  }: { colors: Color[]; backgroundColor: BackgroundColor },
  {
    lightness,
    contrast,
    saturation,
  }: { lightness: number; contrast: number; saturation: number },
  generateBackground: (
    background: Chroma.Color,
  ) => BackgroundColors<Chroma.Color>,
): Theme => {
  const theme = new LeonardoTheme({
    colors,
    backgroundColor,
    lightness,
    contrast,
    saturation,
    output: "LCH",
  });

  const { background: bgStr } = theme.contrastColorPairs;

  const [l, c, h] = bgStr
    .replace("lch(", "")
    .replace(")", "")
    .split(",")
    .map((val) => parseFloat(val));

  const background = chroma.lch(l, c, h);

  const backgrounds = generateBackground(background);

  return {
    name,
    theme,
    backgrounds: backgrounds,
    baseShade,
    brightShade,
  };
};

export type Shade = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
export type ColorShades = Record<Shade, CssColor>;
export type ColorObject = Record<
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
