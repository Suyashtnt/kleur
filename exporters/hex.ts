import { HumanPalette } from "../palletes.ts";

export const toHex = (pallete: HumanPalette): HumanPalette<string> => ({
  base: {
    background: formatHex(pallete.base.background),
    foreground: formatHex(pallete.base.foreground),
  },
  base00: formatHex(pallete.base00),
  base01: formatHex(pallete.base01),
  base02: formatHex(pallete.base02),
  base03: formatHex(pallete.base03),
  base04: formatHex(pallete.base04),
  base05: formatHex(pallete.base05),
  base06: formatHex(pallete.base06),
  base07: formatHex(pallete.base07),
  base08: formatHex(pallete.base08),
  base09: formatHex(pallete.base09),
  base0A: formatHex(pallete.base0A),
  base0B: formatHex(pallete.base0B),
  base0C: formatHex(pallete.base0C),
  base0D: formatHex(pallete.base0D),
  base0E: formatHex(pallete.base0E),
  base0F: formatHex(pallete.base0F),
  overlay: {
    background: formatHex(pallete.overlay.background),
    foreground: formatHex(pallete.overlay.foreground),
  },
  primary: {
    background: formatHex(pallete.primary.background),
    foreground: formatHex(pallete.primary.foreground),
  },
  surface: {
    background: formatHex(pallete.surface.background),
    foreground: formatHex(pallete.surface.foreground),
  },
  secondary: formatHex(pallete.secondary),
  green: formatHex(pallete.green),
  mauve: formatHex(pallete.mauve),
  orange: formatHex(pallete.orange),
  red: formatHex(pallete.red),
  subtle: formatHex(pallete.subtle),
  teal: formatHex(pallete.teal),
  blue: formatHex(pallete.blue),
});
