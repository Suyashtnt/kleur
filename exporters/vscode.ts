import { render } from "mustache";
import { fromObjectEntries, objectEntries } from "../lib.ts";
import { toBase16 } from "./base16.ts";
import { toHex } from "./hex.ts";
import { Theme } from "../palettes.ts";

export const toVscodeTheme = async (theme: Theme, name: string) => {
  const template = await Deno.readTextFile("templates/vscode.mustache");

  const hexTheme = toHex(theme);
  const hex = objectEntries(hexTheme)
    .reduce((acc, [key, value]) => {
      acc[key] = value[600] ?? value;
      return acc;
    }, {} as Record<string, string>);

  const base16 = toBase16(theme);

  const colorObject = {
    ...base16,
    ...hex,
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
