import { darkTheme, toHex, toVscodeTheme } from "./mod.ts"
import * as YAML from "yaml"
 
const dark = toHex(darkTheme);

// export dark.json
const darkJson = JSON.stringify(dark);
await Deno.writeTextFile("build/dark.json", darkJson);

// export dark-base16.yaml
const darkYaml = YAML.stringify(dark);
await Deno.writeTextFile("build/dark-base16.yaml", darkYaml);

// export vscode
const vscode = await toVscodeTheme(darkTheme);
await Deno.writeTextFile("build/vscode/theme.json", vscode);
// also copy over LICENSE
await Deno.copyFile("LICENSE", "build/vscode/LICENSE");
// and package
const packageOutput = await new Deno.Command("vsce", {
    args: ["package"],
    cwd: "build/vscode"
}).output();
console.log(new TextDecoder().decode(packageOutput.stdout));
console.error(new TextDecoder().decode(packageOutput.stderr));

