import { toHex } from "../exporters/mod.ts";
import { darkTheme } from "../mod.ts";

console.log(JSON.stringify(toHex(darkTheme), null, 2));
