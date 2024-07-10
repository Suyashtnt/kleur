import { dark } from "../mod.ts";
import { toBase16 } from "../exporters/base16.ts";

const theme = toBase16(dark);
console.log(JSON.stringify(theme, null, 2));
