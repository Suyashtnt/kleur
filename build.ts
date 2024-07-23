import { parseArgs } from "@std/cli/parse-args";
import { dark, light } from "./mod.ts";
import * as YAML from "yaml";
import { colorListToObj } from "./generate.ts";
import { Theme } from "./palettes.ts";
import { objectEntries } from "./lib.ts";
import { toZedThemes } from "./exporters/zed.ts";
import { themeToColors } from "./exporters/outputConversion.ts";
import { toBase24 } from "./exporters/base24.ts";
import { toWindowsTerminalTheme } from "./exporters/windowsTerminal.ts";
import { toCss } from "./exporters/css.ts";
import { toVscodeTheme } from "./exporters/vscode.ts";
import { toHelixTheme } from "./exporters/helix.ts";
import { toGtkTheme } from "./exporters/gtk.ts";

const { "vsce-path": vscePath } = parseArgs(
  Deno.args,
);

if (!vscePath) {
  console.error(
    "Please provide a path to the vsce executable with --vsce-path",
  );
  Deno.exit(1);
}

/**
 * Builds themes for apps or formats that don't support multiple themes bundled together
 *
 * @param theme The theme to build
 * @param name The name of the theme
 */
const buildSingleThemes = async (theme: Theme, type: string) => {
  const pathType = type.toLowerCase();
  console.log(`Building ${type} themes`);
  const [_, ...colorList] = theme.theme.contrastColors;
  const backgrounds = objectEntries(theme.backgrounds)
    .map(([name, color]) => [name, color.lch()] as const)
    .reduce((acc, [name, [l, c, h]]) => {
      acc[name] = `lch(${l}, ${c}, ${h})`;
      return acc;
    }, {} as Record<string, string>);

  const lch = {
    ...backgrounds,
    ...colorListToObj(colorList),
  };
  const lchJson = JSON.stringify(lch, null, 2);
  await Deno.writeTextFile(`build/${pathType}/kleur-lch.json`, lchJson);

  const hex = themeToColors(theme, (color) => color.hex());
  const hexJson = JSON.stringify(hex, null, 2);
  await Deno.writeTextFile(`build/${pathType}/kleur-hex.json`, hexJson);

  const base16 = toBase24(theme);
  // @ts-ignore not an issue
  base16.name = base16.scheme;
  const base16Json = JSON.stringify(base16, null, 2);
  const base16Yaml = YAML.stringify(base16);
  await Deno.writeTextFile(`build/${pathType}/kleur.yaml`, base16Yaml);
  await Deno.writeTextFile(`build/${pathType}/kleur.json`, base16Json);

  const windowsTerminal = await toWindowsTerminalTheme(theme);
  await Deno.writeTextFile(
    `build/${pathType}/windows-terminal.json`,
    windowsTerminal,
  );

  const helix = await toHelixTheme(theme);
  await Deno.writeTextFile(`build/${pathType}/helix.toml`, helix);

  const gtk = await toGtkTheme(theme);
  await Deno.writeTextFile(`build/${pathType}/gtk.css`, gtk);

  const css = toCss(theme);
  await Deno.writeTextFile(`build/${pathType}/kleur.css`, css);

  console.log(`Built ${type} themes`);
};

const buildVscode = async () => {
  // Build Vscode
  console.log("Building vscode themes");

  const darkCode = await toVscodeTheme(dark);
  const lightCode = await toVscodeTheme(light);
  await Deno.writeTextFile(`build/vscode/dark.json`, darkCode);
  await Deno.writeTextFile(`build/vscode/light.json`, lightCode);

  await Deno.copyFile("LICENSE", "build/vscode/LICENSE");
  const packageOutput = await new Deno.Command(vscePath, {
    args: ["package"],
    cwd: "build/vscode",
  }).output();

  console.log(new TextDecoder().decode(packageOutput.stdout));
  console.error(new TextDecoder().decode(packageOutput.stderr));

  console.log("Built vscode themes");
};

// TODO: zed
const buildZed = async () => {
  console.log("Building zed themes");
  const theme = await toZedThemes([dark, light]);
  await Deno.writeTextFile(`build/zed.json`, theme);
  console.log("Built zed themes");
};

await Promise.all([
  buildSingleThemes(dark, "Dark"),
  buildSingleThemes(light, "Light"),
  buildVscode(),
  buildZed(),
]);
