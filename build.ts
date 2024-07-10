import { parseArgs } from "@std/cli/parse-args";
import { Theme } from "@adobe/leonardo-contrast-colors";
import {
  dark,
  light,
  toBase16,
  toCss,
  toHex,
  toVscodeTheme,
  toWindowsTerminalTheme,
} from "./mod.ts";
import * as YAML from "yaml";
import { colorListToObj } from "./generate.ts";

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
  console.log(`Building ${type} themes`);
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  const name = `Kleur ${capitalizedType}`;

  const [background, ...colorList] = theme.contrastColors;

  const lch = {
    background,
    ...colorListToObj(colorList),
  };
  const lchJson = JSON.stringify(lch);
  await Deno.writeTextFile(`build/${type}/kleur-lch.json`, lchJson);

  const hex = toHex(theme);
  const hexJson = JSON.stringify(hex, null, 2);
  await Deno.writeTextFile(`build/${type}/kleur-.json`, hexJson);

  const base16 = toBase16(theme);
  const base16Yaml = YAML.stringify(base16);
  await Deno.writeTextFile(`build/${type}/kleur.yaml`, base16Yaml);

  const windowsTerminal = await toWindowsTerminalTheme(theme, name);
  await Deno.writeTextFile(
    `build/${type}/windows-terminal.json`,
    windowsTerminal,
  );

  const css = toCss(theme);
  await Deno.writeTextFile(`build/${type}/kleur.css`, css);

  console.log(`Built ${type} themes`);
};

const buildVscode = async () => {
  // Build Vscode
  console.log("Building vscode themes");

  const darkCode = await toVscodeTheme(dark, "Kleur Dark");
  const lightCode = await toVscodeTheme(light, "Kleur Light");
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

await Promise.all([
  buildSingleThemes(dark, "dark"),
  buildSingleThemes(light, "light"),
  buildVscode(),
]);
