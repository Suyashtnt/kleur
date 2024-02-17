import { darkTheme, toHex } from "./mod.ts"

// export dark.json
const darkJson = JSON.stringify(toHex(darkTheme));
await Deno.writeTextFile("build/dark.json", darkJson);
