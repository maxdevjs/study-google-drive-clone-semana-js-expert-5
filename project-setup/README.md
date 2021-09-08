# My setup

> Note: this is a WIP thing

## What the heck a nix-shell is

[nix-shell](https://nixos.org/manual/nix/unstable/command-ref/nix-shell.html) is a way to provide some kind of virtual [environment](https://nixos.wiki/wiki/Development_environment_with_nix-shell) to start an interactive shell that `should` ensure `reproducibility` and `declarativty` (and bla, bla, ...) of the environment itself on `Linux`, `macOS`, and wherever the [Nix](https://nixos.wiki/wiki/Nix) package manager can be installed.

> [Resources](#resources)?

Sounds amazing to share development environments, isn't?

## What this specific shell offers

A simple development environment for [Node.js](https://nodejs.dev/) (more specifically, [Node.js](https://nodejs.dev/) in this project):

- [Node.js](https://nodejs.dev/) itself
  - from [nixos.org/packages](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=nodejs)
    - in version `16_x` (currently `16.8`)
- [TypeScript Language Server](https://github.com/typescript-language-server/typescript-language-server#readme) ([LSP](https://microsoft.github.io/language-server-protocol/))
  - from [nixos.org/packages](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=tsserver)
- both tools are the installed from the `unstable` channel (latest packages available)

## Why

Instead of installing [Node.js](https://nodejs.dev/), the `LSP server`, etc spreading the tools in our system, we create a sort of `virtual environment` that should be consistently shareable among developers.

> Shareability is **not** the priority here: I made it mainly out of laziness. As this setup can automate, for example, the creation of similar projects it could still be an entry point to start to tinker with the topic.

## How it works

Taking [lessons/lesson01/](lessons/lesson01/) as example, this project has the following main structure:

```yaml
❯ tree . -L 1
.
├── gdrive-webapi
└── gdrive-webapp
```

I have specific and indipendent `nix-shell` setups for both `gdrive-webapi` and `gdrive-webapp`:

```yaml
❯ tree . -L 2
.
├── gdrive-webapi
│   ├── certificates
│   ├── coverage
│   ├── downloads
│   ├── .envrc
│   ├── jest.config.mjs
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── setup
│   ├── shell.nix
│   ├── src
│   └── test
└── gdrive-webapp
├── demo.png
├── .envrc
├── .gitignore
├── node_modules
├── package.json
├── package-lock.json
├── public
├── README.md
├── setup
└── shell.nix
```

The relevant files are `.envrc`, `setup`, and `shell.nix`

Summarizing:

- `.envrc` is used to automatically `activate`, `load`, `initialize`, the environment
  - when entering the directory
    - thanks to [direnv](https://direnv.net/) (yup, otherwise the shell must be manually activated)
- `shell.nix` is where the ... `nix-shell` is `declared`
- `setup` is a `shell script` used to:
  - automate
    - the `npm` modules installation
    - [Jest](https://jestjs.io/) initialization
      - etc.

> Note: the activation process can cause some delay if updates are available, for example.

### What it looks like

<details open>
<summary>.envrc</summary>

- this file simply
  - tells to [direnv](https://direnv.net/)
    - to automatically `activate`, `load`, `initialize` the environment (it checks for tools upgrades, install them if available, etc) the `nix-shell`
      - every time we `cd` into the directory

```yaml
use nix
```

</details>

<details>
<summary>shell.nix</summary>

```yaml
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
```

We are not going to learn what everything in all that 🤪 `declaration` does (check [Resources](#resources) for a minimal enlightenment).

Basically, we state that we wish to:

- grab the unstable (latest) versions of the packages
- install them in a `constrained` environment
- make some 🤔 for `Linux` and `macOS` sugarness
- `execute` our `setup` script when `activating` the `nix-shell`

</details>

<details>
<summary>setup</summary>

```yaml
#!/usr/bin/env sh

JEST_CONFIG_FILE="jest.config.mjs"

if [ -f $FILE ]; then
  echo "$JEST_CONFIG_FILE exists"
else
  npm i -D jest@27 #nodemon@2.0
  npx jest --init
fi

npm i pino@6.8 pino-pretty@5.1 socket.io@4.1 pretty-bytes@5.6
```

- if `jest.config.mjs`
  - does not exist
    - we install and initialize it (we still have to update it with our own settings, if needed)
    - otherwise, we skip these steps
- to simplify the script
  - the remaining modules are `checked` every time a `nix-shell` starts

</details>

All those actions should be transparent to us as users, as far as the scripts are able to read our mind 🧠.

## Resources

For a minimal enlightenment:

- [NixOS](https://nixos.org/)
- [Nix](https://nixos.wiki/wiki/Nix)
- [direnv](https://direnv.net/)

### Direnv related

- [direnv wiki page about Nix](https://github.com/direnv/direnv/wiki/Nix)
- [Automating development environment set-up with Direnv](http://www.futurile.net/2016/02/03/automating-environment-setup-with-direnv/)
- [More prac­ti­cal direnv](https://rnorth.org/more-practical-direnv/)
  - [rnorth/.direnvrc](https://gist.github.com/rnorth/0fd5048da85957da39c17bd49c4ca922)

### Shameless Plug

> One more WIP

I extracted this setup to a [nix-shell for Node.js](https://github.com/maxdevjs/dev-nix-shells-nodejs)

For more [nix-shells](https://nixos.org/manual/nix/stable/#description-13) ([Elixir](https://elixir-lang.org/), [Erlang](https://www.erlang.org/), [Phoenix](https://www.phoenixframework.org/), [Lua](https://www.lua.org/), [Rails](https://rubyonrails.org/), [Ruby](https://www.ruby-lang.org/en/)) check [maxdevjs/dev-nix-shells](https://github.com/maxdevjs/dev-nix-shells)
