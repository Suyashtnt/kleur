import { Theme } from "@adobe/leonardo-contrast-colors";
import { Base16 } from "../palletes.ts";
import { toHex } from "./hex.ts";

export const toBase16 = (
  theme: Theme,
): Base16<string> => {
  const {
    background,
    base,
    primary,
    secondary,
    red,
    green,
    orange,
  } = toHex(theme);

  return {
    base00: background.background,
    base01: base[100],
    base02: base[200],
    base03: base[300],
    base04: base[300],
    base05: base[400],
    base06: base[500],
    base07: base[600],
    base08: primary[600],
    base09: green[600],
    base0A: secondary[600],
    base0B: green[600],
    base0C: red[600],
    base0D: primary[600],
    base0E: secondary[600],
    base0F: orange[600],
  };
};
