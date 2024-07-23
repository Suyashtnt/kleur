{
  description = "A basic flake with a shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    base16.url = "github:SenchoPens/base16.nix";
  };

  outputs = {
    self,
    nixpkgs,
    base16,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};

      base16-lib = pkgs.callPackage base16.lib {};

      dark-theme-base16 = builtins.fromJSON (builtins.readFile ./build/dark/kleur.json);
      dark-theme = base16-lib.mkSchemeAttrs dark-theme-base16;

      light-theme-base16 = builtins.fromJSON (builtins.readFile ./build/light/kleur.json);
      light-theme = base16-lib.mkSchemeAttrs light-theme-base16;
    in {
      devShells.default = pkgs.mkShell {
        packages = [pkgs.deno pkgs.nil pkgs.alejandra pkgs.vsce pkgs.nodejs];
      };

      themes = {
        dark = {
          base16-nix = dark-theme;
          base16 = dark-theme-base16;
          build = ./build/dark;
        };
        light = {
          base16-nix = light-theme;
          base16 = light-theme-base16;
          build = ./build/light;
        };
        zed = ./build/zed.json;
        vscode = ./build/vscode/kleur-code-0.3.0.vsix;
      };
    });
}
