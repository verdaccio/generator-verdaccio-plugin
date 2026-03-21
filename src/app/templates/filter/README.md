# <%= name %>

<%- (description || '').split('\n').map(function (line) {
return '> ' + line
}).join('\n') %>

---

## Usage

Add the plugin to your Verdaccio configuration file (`config.yaml`):

```yaml
filters:
  <%= name %>:
    enabled: true
```

## Development

See the [verdaccio contributing guide](https://github.com/verdaccio/verdaccio/blob/master/CONTRIBUTING.md) for instructions setting up your development environment.
Once you have completed that, use the following npm tasks.

- `npm run build`

  Build a distributable archive

- `npm run test`

  Run unit test

- `npm run verify`

  Verify the plugin can be loaded by Verdaccio. This runs [`@verdaccio/plugin-verifier`](https://www.npmjs.com/package/@verdaccio/plugin-verifier) which checks that the plugin exports the correct interface and can be instantiated as a **filter** plugin.

For more information about any of these commands run `npm run ${task} -- --help`.
