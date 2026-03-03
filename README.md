# generator-verdaccio-plugin

[![verdaccio (latest)](https://img.shields.io/npm/v/generator-verdaccio-plugin/latest.svg)](https://www.npmjs.com/package/generator-verdaccio-plugin)
[![verdaccio (downloads)](https://img.shields.io/npm/dy/generator-verdaccio-plugin.svg)](https://www.npmjs.com/package/generator-verdaccio-plugin)
[![Backers](https://opencollective.com/verdaccio/tiers/backer/badge.svg?label=Backer&color=brightgreen)](https://opencollective.com/verdaccio)
[![Discord](https://img.shields.io/discord/388674437219745793?logo=discord)](http://chat.verdaccio.org/)

A [Yeoman](http://yeoman.io) generator that scaffolds [Verdaccio](https://verdaccio.org) plugins with TypeScript and a ready-to-use project structure — so you can focus on writing plugin logic instead of boilerplate.

## Requirements

- [Node.js](https://nodejs.org/) >= 20
- [Yeoman](http://yeoman.io) (`yo`)

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

| Prompt                | Description                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| Plugin type           | `auth`, `storage`, `middleware`, or `filter` (see below)                    |
| Plugin name           | Suffix after `verdaccio-` — e.g. `my-plugin` produces `verdaccio-my-plugin` |
| Description           | Short description added to `package.json`                                   |
| GitHub username / org | Populates the `repository` field in `package.json`                          |
| Author name & email   | Stored locally and reused in future runs                                    |
| Keywords              | Comma-separated; `verdaccio` is always appended automatically               |

## Plugin Types

| Type         | Implements                                      | Use when you want to…                                             |
| ------------ | ----------------------------------------------- | ----------------------------------------------------------------- |
| `auth`       | `authenticate`, `allow_access`, `allow_publish` | Control who can log in and access packages                        |
| `storage`    | Custom storage backend                          | Store packages somewhere other than the local filesystem          |
| `middleware` | Express middleware                              | Add custom HTTP routes or request/response processing             |
| `filter`     | `filter_metadata`                               | Transform or filter package metadata before it reaches the client |

### Registering your plugin in `verdaccio.yaml`

**Auth**

```yaml
auth:
  verdaccio-my-plugin:
    # your custom config
```

**Storage**

```yaml
store:
  verdaccio-my-plugin:
    # your custom config
```

**Middleware**

```yaml
middlewares:
  verdaccio-my-plugin:
    enabled: true
```

**Filter**

```yaml
filters:
  verdaccio-my-plugin:
    # your custom config
```

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

After scaffolding, build the plugin and link it for local testing:

```bash
cd verdaccio-<name>
npm install
npm run build
npm link
```

Then add the plugin name to your `verdaccio.yaml` and run Verdaccio.

## Contributing

```bash
# Install dependencies
pnpm install

# Build the generator
pnpm build

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

See the [Verdaccio contributing guide](https://github.com/verdaccio/verdaccio/blob/master/CONTRIBUTING.md) for broader contribution guidelines.

## License

MIT © [Juan Picado &lt;@jotadeveloper&gt;]()
