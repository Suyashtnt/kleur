import { darkTheme, toHex } from "./mod.ts"
import * as YAML from "yaml"
 
const dark = toHex(darkTheme);

// export dark.json
const darkJson = JSON.stringify(dark);
await Deno.writeTextFile("build/dark.json", darkJson);

// export dark-base16.yaml
const darkYaml = YAML.stringify(dark);
await Deno.writeTextFile("build/dark-base16.yaml", darkYaml);
