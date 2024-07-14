import { Base24, Theme } from "../palettes.ts";
import { toHex } from "./hex.ts";

/**
 * Convert a theme to a base24 theme
 *
 * Note: this also functions as base16, as base24 is just a shade extension of base16
 * @param theme The theme to convert
 * @returns A base16 theme
 */
export const toBase24 = (
  theme: Theme,
): Base24<string> & { scheme: string } => {
  const { baseShade, brightShade, name } = theme;
  const {
    background,
    overlay,
    surface,
    base,
    blue,
    purple,
    red,
    green,
    orange,
    teal,
  } = toHex(theme);

  return {
    scheme: `Kleur ${name}`,
    base00: background,
    base01: surface,
    base02: overlay,
    base03: base[300],
    base04: base[300],
    base05: base[400],
    base06: base[500],
    base07: base[600],
    base08: red[baseShade],
    base09: orange[baseShade],
    base0A: orange[baseShade],
    base0B: green[baseShade],
    base0C: teal[baseShade],
    base0D: blue[baseShade],
    base0E: purple[baseShade],
    base0F: orange[baseShade],
    base10: surface,
    base11: background,
    base12: red[brightShade],
    base13: orange[brightShade],
    base14: green[brightShade],
    base15: teal[brightShade],
    base16: blue[brightShade],
    base17: purple[brightShade],
  };
};
