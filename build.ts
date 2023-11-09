import { build, emptyDir } from "dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "kleurskema",
    version: "0.2.0",
    description: "Dark, tonal, beautiful.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/Suyashtnt/kleur.git",
    },
    bugs: {
      url: "https://github.com/Suyashtnt/kleur/issues",
    },
    devDependencies: {
      "@types/culori": "2.0.4",
    },
  },
  importMap: "deno.json",
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
