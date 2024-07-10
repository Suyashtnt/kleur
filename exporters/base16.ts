import { Base16, Theme } from "../palettes.ts";
import { toHex } from "./hex.ts";

/**
 * Convert a theme to a base16 theme
 * @param theme The theme to convert
 * @returns A base16 theme
 */
export const toBase16 = (
  theme: Theme,
): Base16<string> => {
  const {
    background,
    overlay,
    surface,
    base,
    primary,
    secondary,
    red,
    green,
    orange,
  } = toHex(theme);

  return {
    base00: background,
    base01: surface,
    base02: overlay,
    base03: base[300],
    base04: base[300],
    base05: base[400],
    base06: base[500],
    base07: base[600],
    base08: primary[500],
    base09: green[500],
    base0A: secondary[500],
    base0B: green[500],
    base0C: red[500],
    base0D: primary[500],
    base0E: secondary[500],
    base0F: orange[500],
  };
};
