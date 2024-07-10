// @deno-types="npm:@types/chroma-js@2"
import Chroma, { type Color } from "chroma";
const { oklch } = Chroma;

export type KeyColors<T> = {
  /** Base background colour */
  base: T;
  red: T;
  orange: T;
  green: T;
  blue: T;
  teal: T;
  purple: T;
};

export type CustomColors<T> = {
  primary: T;
  secondary: T;
};

export type Colors<T> = KeyColors<T> & CustomColors<T> & {
  background: T;
};

/** base16 colours. Used for syntax highlighting and for porting to other apps */
export type Base16<T> = {
  /** Default background */
  base00: T;
  /** Lighter background (used for status bars) */
  base01: T;
  /** Selection background */
  base02: T;
  /** Comments, Invisibles, Line Highlighting */
  base03: T;
  /** Dark foreground */
  base04: T;
  /** Light foreground */
  base05: T;
  /** Lighter foreground */
  base06: T;
  /** Lightest foreground */
  base07: T;
  /** Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted */
  base08: T;
  /** Integers, Boolean, Constants, XML Attributes, Markup Link Url */
  base09: T;
  /** Classes, Markup Bold, Search Text Background */
  base0A: T;
  /** Strings, Inherited Class, Markup Code, Diff Inserted */
  base0B: T;
  /** Support, Regular Expressions, Escape Characters, Markup Quotes */
  base0C: T;
  /** Functions, Methods, Attribute IDs, Headings */
  base0D: T;
  /** Keywords, Storage, Selector, Markup Italic, Diff Changed */
  base0E: T;
  /** Deprecated, Opening/Closing Embedded Language Tags, e.g. <?php ?> */
  base0F: T;
};

export const dark = {
  base: oklch(0.13, 0.03, 284),
  blue: oklch(0.77, 0.2, 240),
  green: oklch(0.77, 0.2, 152),
  orange: oklch(0.77, 0.2, 83),
  purple: oklch(0.77, 0.2, 284),
  red: oklch(0.62, 0.2, 27),
  teal: oklch(0.77, 0.2, 190),
} satisfies KeyColors<Color>;

export const light = {
  base: oklch(0.9, 0.03, 284),
  blue: oklch(0.77, 0.2, 240),
  green: oklch(0.77, 0.2, 152),
  orange: oklch(0.77, 0.2, 83),
  purple: oklch(0.77, 0.2, 284),
  red: oklch(0.62, 0.2, 27),
  teal: oklch(0.77, 0.2, 190),
} satisfies KeyColors<Color>;
