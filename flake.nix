{
  description = "A basic flake with a shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    base16.url = "github:SenchoPens/base16.nix";
  };

  outputs = { self, nixpkgs, base16, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};

      base16-lib = pkgs.callPackage base16.lib {};
      dark-theme = base16-lib.mkSchemeAttrs ./build/dark.json;
    in {
      devShells.default = pkgs.mkShell {
        packages = [ pkgs.deno pkgs.nil pkgs.alejandra ];
      };

      themes = {
        dark = dark-theme;
      };
    });
}
