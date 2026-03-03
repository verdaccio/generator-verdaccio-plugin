# Introduction

`generator-verdaccio-plugin` is a [Yeoman](http://yeoman.io) generator that scaffolds [Verdaccio](https://verdaccio.org) plugins with TypeScript and a ready-to-use project structure.

## Requirements

- [Node.js](https://nodejs.org/) >= 20
- Yeoman (`yo`)

## Installation

```bash
npm install -g yo generator-verdaccio-plugin
```

## Quick Start

```bash
yo verdaccio-plugin
```

The generator walks you through a short set of prompts and creates a `verdaccio-<name>/` directory with everything you need.

## Interactive Prompts

| Prompt | Description |
|--------|-------------|
| Plugin type | `auth`, `storage`, `middleware`, or `filter` |
| Plugin name | Suffix after `verdaccio-` — e.g. `my-plugin` produces `verdaccio-my-plugin` |
| Description | Short description added to `package.json` |
| GitHub username / org | Populates the `repository` field in `package.json` |
| Author name & email | Stored locally and reused in future runs |
| Keywords | Comma-separated; `verdaccio` is always appended automatically |

## Generated Project Structure

```
verdaccio-<name>/
├── src/
│   ├── index.ts          # Re-exports the plugin class
│   └── *-plugin.ts       # Main plugin implementation
├── types/
│   └── index.d.ts        # Custom configuration types
├── .editorconfig
├── .gitignore
├── .npmignore
├── .nvmrc
├── package.json
├── README.md
└── tsconfig.json
```

## Build & Publish

```bash
cd verdaccio-<name>
npm install
npm run build

# publish to your own Verdaccio instance for testing
npm publish --registry http://localhost:4873
```

Then add the plugin to your `verdaccio.yaml`, install it in the Verdaccio instance and restart.
