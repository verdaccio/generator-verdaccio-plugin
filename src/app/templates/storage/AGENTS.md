# Working on this plugin

`<%= name %>` is a Verdaccio **storage** plugin: it owns where manifests and tarballs live.

This is the hardest plugin type. It sits on the request path of every publish and install, and
the tarball contract has rules that fail in ways which are hard to read — a hang, or a dead
process. Read the lifecycle below before writing code.

## Verify your work

Two loops, both fast. Run them after every change; do not hand back code that fails either.

```bash
npm run build    # tsc — catches wrong type names and signatures
npm run verify   # checks the plugin exposes what Verdaccio will call
```

The compiler is the authority. If this file and `tsc` disagree, `tsc` is right.

## The contract

```ts
import { pluginUtils } from '@verdaccio/core';

class Plugin extends pluginUtils.Plugin<Config> implements pluginUtils.Storage<Config> {
  getPackageStorage(packageName: string): pluginUtils.StorageHandler
  // add, remove, get, init, getSecret, setSecret, search, saveToken, deleteToken, readTokens
}
```

Everything returns a **promise**. `StorageHandler` is the per-package object doing the I/O.

**Do not use `IPluginStorage`, `IPackageStorage`, `IPlugin` or `@verdaccio/commons-api`.** Those
were removed years ago; they are still all over old tutorials and model training data. There is
an older callback-shaped contract — Verdaccio 6 uses it — but **do not write a new plugin with
it**: Verdaccio 9 does not support it.

## The tarball lifecycle

On publish Verdaccio calls `hasTarball`, then `writeTarball`, then waits on **events**:

- **Emit `open`, and not synchronously.** The store attaches its listener *after* awaiting
  `writeTarball`, so an `open` emitted synchronously — or on `process.nextTick`, which runs
  before promise continuations — is missed and **the publish hangs forever with no error**.
  Use `setImmediate` or a genuinely async source.
- **Emit `close` once the bytes are durable.** That is what triggers the manifest update.
  No `close`, no published version, even though the upload worked.
- **Emit `error` at most once.** After a failure the store may have dropped its listener, and a
  second `error` with no listener is an uncaught exception that **kills the registry**. Guard
  it with a flag. A missing object usually surfaces twice — a status code and a stream error —
  which is the most common way to hit this.
- Both tarball methods receive an `AbortSignal` tied to the client. When it fires, any promise
  still in flight must have its rejection consumed; an unhandled rejection is again a dead
  process.

## If you back an object store

- **There are no directories.** `removePackage` cannot delete a folder — there is no object at
  `my-package`, only objects under the `my-package/` prefix. Deleting the name 404s and leaves
  every tarball orphaned.
- Nothing serialises writes across processes. Verdaccio serialises within one process only.

## Do not implement

`filterByQuery` and `getScore` appear in copied plugins. Nothing calls them; the filtering
belongs inside your `search`.

## Reference

- https://verdaccio.org/dev/plugin-storage
- Working implementations: https://github.com/verdaccio/verdaccio-aws-s3-storage and
  https://github.com/verdaccio/verdaccio-google-cloud
