import { toHex, toCss } from "../exporters/mod.ts";
import { darkTheme } from "../mod.ts";

console.log(JSON.stringify(toHex(darkTheme), null, 2));

console.log(JSON.stringify(toCss(darkTheme), null, 2));
