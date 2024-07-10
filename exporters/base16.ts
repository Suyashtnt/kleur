import { Theme } from "@adobe/leonardo-contrast-colors";
import { fromObjectEntries, objectEntries } from "../lib.ts";
import { Base16 } from "../palletes.ts";

export const toBase16 = (
  theme: Theme,
): Base16<string> => {
  const asHexTheme = new Theme({
    ...theme,
    output: "HEX",
  });
};
