import { themeToColors } from "../exporters/mod.ts";
import { darkTheme } from "../mod.ts";

const themeFlattened = Object.values(themeToColors(darkTheme)).map((value) => {
  if (typeof value === "string") return value;
  return Object.values(value);
}).flat();

console.log(themeFlattened.join("\n"));
