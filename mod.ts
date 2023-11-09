import { HumanPalette, Palette } from "./palletes.ts";
import { dark } from "./palletes.ts";

/**
 * Processes a palette into a more
 * usable format. Most things are
 * renamed to be more descriptive
 * and will have usage guides
 * @param pallete the palette to process
 */
const processPalette = (pallete: Palette): HumanPalette => ({
  ...pallete,
  mauve: pallete.base08,
  orange: pallete.base09,
  red: pallete.base0A,
  green: pallete.base0B,
  teal: pallete.base0C,
  subtle: pallete.base0F,
});

export const darkTheme = processPalette(dark);

export * from "./exporters/mod.ts"
