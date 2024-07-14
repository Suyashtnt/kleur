import { render } from "mustache";
import { ColorObject } from "../generate.ts";
import { fromObjectEntries } from "../lib.ts";
import { objectEntries } from "../lib.ts";
import { BackgroundColors, Theme } from "../palettes.ts";
import { toBase24 } from "./base24.ts";
import { convertTheme, themeToColors } from "./outputConversion.ts";

export const toMustache = (
  theme: Theme,
  template: string,
  extra: Record<PropertyKey, string> = {},
) => {
  const hexTheme = themeToColors(
    convertTheme(theme, "HEX"),
    (color) => color.hex(),
  );
  const hexObject = {
    ...toMustacheList(theme, hexTheme),
    ...toBase24(theme),
  };
  const hex: Record<string, string> = fromObjectEntries(
    objectEntries(hexObject).map((
      [key, value],
    ) => [`${key}-hex`, value.startsWith("#") ? value.slice(1) : value]),
  );

  // preferred over hex if available, as it's more accurate
  const lchTheme = themeToColors(convertTheme(theme, "LCH"), (color) => {
    const [l, c, h] = color.lch();
    return `lch(${l}, ${c}, ${h})`;
  });

  const lch: Record<string, string> = fromObjectEntries(
    objectEntries(toMustacheList(theme, lchTheme)).map((
      [key, value],
    ) => [`${key}-lch`, value]),
  );

  const mustaceTheme = {
    "scheme-name": `Kleur ${theme.name}`,
    polarity: theme.polarity,
    ...hex,
    ...lch,
    ...extra,
  };

  return render(template, mustaceTheme);
};

const toMustacheList = (
  theme: Theme,
  colors: ColorObject & BackgroundColors<string>,
) =>
  objectEntries(colors)
    .reduce((acc, [key, value]) => {
      if (typeof value === "string") {
        acc[key] = value;
      } else {
        acc[key] = value[theme.baseShade];
        acc[`${key}-bright`] = value[theme.brightShade];
        // direct shade access. Not really recommended but useful for some cases
        for (const [shade, val] of objectEntries(value)) {
          acc[`${key}-${shade}`] = val;
        }
      }
      return acc;
    }, {} as Record<string, string>);
