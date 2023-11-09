import { formatCss } from "culori/fn";
import { HumanPalette } from "../palletes.ts";

export const toCss = (pallete: HumanPalette): HumanPalette<string> => ({
  base: {
    background: formatCss(pallete.base.background),
    foreground: formatCss(pallete.base.foreground),
  },
  base00: formatCss(pallete.base00),
  base01: formatCss(pallete.base01),
  base02: formatCss(pallete.base02),
  base03: formatCss(pallete.base03),
  base04: formatCss(pallete.base04),
  base05: formatCss(pallete.base05),
  base06: formatCss(pallete.base06),
  base07: formatCss(pallete.base07),
  base08: formatCss(pallete.base08),
  base09: formatCss(pallete.base09),
  base0A: formatCss(pallete.base0A),
  base0B: formatCss(pallete.base0B),
  base0C: formatCss(pallete.base0C),
  base0D: formatCss(pallete.base0D),
  base0E: formatCss(pallete.base0E),
  base0F: formatCss(pallete.base0F),
  overlay: {
    background: formatCss(pallete.overlay.background),
    foreground: formatCss(pallete.overlay.foreground),
  },
  primary: {
    background: formatCss(pallete.primary.background),
    foreground: formatCss(pallete.primary.foreground),
  },
  secondary: {
    background: formatCss(pallete.secondary.background),
    foreground: formatCss(pallete.secondary.foreground),
  },
  surface: {
    background: formatCss(pallete.surface.background),
    foreground: formatCss(pallete.surface.foreground),
  },
  green: formatCss(pallete.green),
  mauve: formatCss(pallete.mauve),
  orange: formatCss(pallete.orange),
  red: formatCss(pallete.red),
  subtle: formatCss(pallete.subtle),
  teal: formatCss(pallete.teal),
});
