 
{ pkgs ? import <nixpkgs> {} }:

with pkgs;

let
  unstable = import <nixos-unstable> { config = { allowUnfree = true; }; };
  inherit (lib) optional optionals;

  tsserver_ls = unstable.nodePackages.typescript-language-server;

  node = unstable.nodejs-16_x;
in

mkShell {
  buildInputs = [ node tsserver_ls ]
    # Live Reloading. As we change our views or assets,
    # it automatically reloads the page in the browser
    ++ optional stdenv.isLinux libnotify # For ExUnit Notifier on Linux
    ++ optional stdenv.isLinux inotify-tools # For file_system on Linux
    ++ optional stdenv.isDarwin terminal-notifier # For ExUnit Notifier on macOS
    ++ optionals stdenv.isDarwin (with darwin.apple_sdk.frameworks; [
      # For file_system on macOS
      CoreFoundation
      CoreServices
    ]);

  shellHook = ''
    export LANG=en_US.UTF-8
    
    source ./setup
  '';
}
