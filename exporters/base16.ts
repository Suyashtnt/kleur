import { fromObjectEntries, objectEntries } from "../lib.ts";
import { Base16, Palette } from "../palletes.ts";
// @deno-types="npm:@types/culori"
import { formatCss } from "culori/fn";

export const toBase16 = (
  // deno-lint-ignore no-unused-vars
  { base, overlay, primary, secondary, surface, ...pallete }: Palette,
): Base16<string> =>
  fromObjectEntries(
    objectEntries(pallete).map(([name, colour]) => [name, formatCss(colour)]),
  );
