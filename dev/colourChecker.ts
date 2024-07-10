import { dark } from "../palettes.ts";

const colors = Object.entries(dark);
const foregroundcolors = colors.map((
  [name, color],
  // @ts-expect-error well yes typescript this could be null thats why the ?? is there
) => [name, rgb(color.foreground ?? color)]);

const backgroundcolors = colors.map((
  [name, color],
  // @ts-expect-error well yes typescript this could be null thats why the ?? is there
) => [name, rgb(color.background ?? color)]);

const colorRows = backgroundcolors.map(([name, background]) => {
  return [
    name,
    foregroundcolors.map(([name, foreground]) => {
      return {
        name,
        background,
        foreground,
      };
    }),
  ] as const;
});

// display the columns
for (const [name, colors] of colorRows) {
  const thisRowscolor = colors.find(({ name }) => name === name)!;
  console.log(
    `%c${name}`,
    `color: ${thisRowscolor.foreground}; background-color: ${thisRowscolor.background};`,
  );

  const colorRow = colors.reduce((acc, { name, background, foreground }) => {
    acc.string += `%c${name} `;
    acc.style.push(`color: ${foreground}; background-color: ${background};`);
    return acc;
  }, { string: "", style: [] as string[] });

  console.log(colorRow.string, ...colorRow.style);
  console.log();
}
