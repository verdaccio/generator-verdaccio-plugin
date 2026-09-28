---
'generator-verdaccio-plugin': major
---

generate an AGENTS.md per plugin type and move storage to the promise based API

Scaffolded plugins now include an `AGENTS.md` written for coding assistants. The plugin
interfaces were renamed in Verdaccio 7 — `IPluginMiddleware`, `IPluginAuth`, `IPluginStorage`,
`IPackageStorage` and `@verdaccio/commons-api` are all gone — but years of tutorials still use
the old names, so an assistant with no context writes a plugin that does not compile.

Each plugin type gets its own file with the contract it has to implement, the mistakes that
type is prone to, and the two verification loops the scaffold already provides
(`npm run build` and `npm run verify`).

Breaking changes to the generated plugin:

- The storage template was still on the callback based contract that Verdaccio 7 dropped. It
  now implements `pluginUtils.Storage` and `pluginUtils.StorageHandler`, every method returning
  a promise, and documents the tarball event contract (`open` asynchronously, `close` once the
  bytes are durable, `error` at most once). `filterByQuery` and `getScore`, which Verdaccio
  never calls, were removed. The generated README states the plugin requires Verdaccio 7.x or
  newer.
- `@verdaccio/streams` is no longer a dependency of the storage template; the promise based
  contract uses `node:stream`.
- Generated plugins now require Node.js 24 or newer and pin TypeScript 7, which `tsc` based
  builds previously relied on without declaring.
