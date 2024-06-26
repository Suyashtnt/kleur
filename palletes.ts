// @deno-types="npm:@types/culori"
import { useMode, modeOklch, type Oklch } from "culori/fn";

const oklch = useMode(modeOklch);

/**
 * Loosely based of Material 3 and Catppuccin
 */
export enum PaletteColours {
  /** Base colour. Darkest colour that sets the main window colour. Has 60-70% opacity with high blur */
  BASE = "base",
  /** Primary colour. Used for main elements such as headers and cards. Has 80% opacity with high blur */
  PRIMARY = "primary",
  /** Surface colour. Used for surfaces such as cards and sheets. Has 90% opacity with high blur */
  SURFACE = "surface",
  /** Overlay colour. Used for overlays such as dialogs and menus. Has 90% opacity with high blur */
  OVERLAY = "overlay",
}

export interface Extras<T> {
  secondary: T
}

export interface HumanColours<T> {
  mauve: T;
  orange: T;
  red: T;
  green: T;
  teal: T;
  subtle: T;
  blue: T;
}

export interface ColourTypes<T> {
  /** Base bright colour. Usually for text and icons */
  foreground: T;
  /** Background colour. Usually based off a de-saturated/darker foreground. May also be used for borders/outlines */
  background: T;
}

/** base16 colours. Used for syntax highlighting and for porting to other apps */
export interface Base16<T> {
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
}

export type Palette<T = Oklch> =
  & Record<PaletteColours, ColourTypes<T>>
  & Base16<T>
  & Extras<T>;

export type HumanPalette<T = Oklch> =
  Palette<T>
  & HumanColours<T>;

export const dark = {
  base: {
    background: oklch("oklch(13% 0.03 284)")!,
    foreground: oklch("oklch(88% 0.03 284)")!,
  },
  surface: {
    background: oklch("oklch(15% 0.05 284)")!,
    foreground: oklch("oklch(90% 0.05 284)")!,
  },
  overlay: {
    background: oklch("oklch(20% 0.05 284)")!,
    foreground: oklch("oklch(94% 0.07 284)")!,
  },
  primary: {
    background: oklch("oklch(35% 0.2 284)")!,
    foreground: oklch("oklch(77% 0.2 284)")!,
  },
  secondary: oklch("oklch(77% 0.2 240)")!,
  base00: oklch("oklch(13% 0.03 284)")!,
  base01: oklch("oklch(15% 0.05 284)")!,
  base02: oklch("oklch(20% 0.04 284)")!,
  base03: oklch("oklch(30% 0.04 284)")!,
  base04: oklch("oklch(50% 0.04 284)")!,
  base05: oklch("oklch(90% 0.04 284)")!,
  base06: oklch("oklch(94% 0.04 284)")!,
  base07: oklch("oklch(77% 0.2 284)")!,
  base08: oklch("oklch(77% 0.2 284)")!,
  base09: oklch("oklch(77% 0.2 83)")!,
  base0A: oklch("oklch(62% 0.2 27)")!,
  base0B: oklch("oklch(77% 0.2 152)")!,
  base0C: oklch("oklch(77% 0.2 190)")!,
  base0D: oklch("oklch(77% 0.2 284)")!,
  base0E: oklch("oklch(77% 0.2 240)")!,
  base0F: oklch("oklch(30% 0.04 284)")!,
} as const satisfies Palette;
