import { formatCss as rgb } from "culori/fn";
import { dark } from "../palletes.ts";

const colours = Object.entries(dark);
const foregroundColours = colours.map((
  [name, colour],
  // @ts-expect-error this works due to the ??
) => [name, rgb(colour.foreground ?? colour)]);
const backgroundColours = colours.map((
  [name, colour],
  // @ts-expect-error this works due to the ??
) => [name, rgb(colour.background ?? colour)]);

const colourRows = backgroundColours.map(([name, background]) => {
  return [
    name,
    foregroundColours.map(([name, foreground]) => {
      return {
        name,
        background,
        foreground,
      };
    }),
  ] as const;
});

// display the columns
for (const [name, colours] of colourRows) {
  const thisRowsColour = colours.find(({ name }) => name === name)!;
  console.log(
    `%c${name}`,
    `color: ${thisRowsColour.foreground}; background-color: ${thisRowsColour.background};`,
  );

  const colourRow = colours.reduce((acc, { name, background, foreground }) => {
    acc.string += `%c${name} `;
    acc.style.push(`color: ${foreground}; background-color: ${background};`);
    return acc;
  }, { string: "", style: [] as string[] });

  console.log(colourRow.string, ...colourRow.style);
  console.log();
}
