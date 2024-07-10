import { render } from "mustache";
import { Theme } from "@adobe/leonardo-contrast-colors";
import { fromObjectEntries, objectEntries } from "../lib.ts";
import { toBase16 } from "./base16.ts";
import { toHex } from "./hex.ts";

export const toVscodeTheme = async (theme: Theme, name: string) => {
  const template = await Deno.readTextFile("templates/vscode.mustache");

  const { background, ...hexTheme } = toHex(theme);
  const hex = objectEntries(hexTheme)
    .reduce((acc, [key, value]) => {
      acc[key] = value[600];
      return acc;
    }, {} as Record<string, string>);

  const base16 = toBase16(theme);

  const colorObject = {
    ...base16,
    ...hex,
    background: background.background,
  };

  const colors: Record<
    `${string}-hex`,
    string
  > = fromObjectEntries(
    objectEntries(colorObject).map(([key, value]) => [
      key + "-hex" as `${string}-hex`,
      value.replace?.("#", ""),
    ]),
  );

  return render(template, {
    "scheme-name": name,
    ...colors,
  });
};
