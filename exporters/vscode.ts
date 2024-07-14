import { render } from "mustache";
import { fromObjectEntries, objectEntries } from "../lib.ts";
import { toBase24 } from "./base16.ts";
import { toHex } from "./hex.ts";
import { Theme } from "../palettes.ts";

export const toVscodeTheme = async (theme: Theme) => {
  const { baseShade, brightShade, name } = theme;
  const template = await Deno.readTextFile("templates/vscode.mustache");

  const hexTheme = toHex(theme);
  const hex = objectEntries(hexTheme)
    .reduce((acc, [key, value]) => {
      if (typeof value === "string") {
        acc[key] = value;
      } else {
        acc[key] = value[baseShade];
        acc[`${key}-bright`] = value[brightShade];
      }
      return acc;
    }, {} as Record<string, string>);

  const { scheme: _, ...base24 } = toBase24(theme);

  const hexedBase24: Record<
    `${string}-hex`,
    string
  > = fromObjectEntries(
    objectEntries(base24).map(([key, value]) => [
      key + "-hex" as `${string}-hex`,
      value,
    ]),
  );

  const colors: Record<string, string> = fromObjectEntries(
    objectEntries({
      ...hexedBase24,
      ...hex,
    } as Record<string, string>).map(([key, value]) => [
      key,
      value.startsWith("#") ? value.slice(1) : value,
    ]),
  );

  return render(template, {
    "scheme-name": `Kleur ${name}`,
    ...colors,
  });
};
