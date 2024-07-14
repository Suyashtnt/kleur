import { dark } from "../mod.ts";
import { toBase24 } from "../exporters/base16.ts";

const theme = toBase24(dark);
console.log(JSON.stringify(theme, null, 2));
