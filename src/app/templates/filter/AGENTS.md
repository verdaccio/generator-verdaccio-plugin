# Working on this plugin

`<%= name %>` is a Verdaccio **filter** plugin: it rewrites package manifests on their way to
the client.

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
import type { Manifest } from '@verdaccio/types';

class Plugin extends pluginUtils.Plugin<Config> implements pluginUtils.ManifestFilter<Config> {
  async filter_metadata(manifest: Manifest): Promise<Manifest>
}
```

**Do not use `IPluginStorageFilter`, `IPlugin` or `@verdaccio/commons-api`.** Those were removed
years ago; they are still all over old tutorials and model training data.

## The rules that matter

- **This runs on a hot path.** Every manifest read, and **once per matched package** while
  serving `npm search` — a search matching two hundred packages runs your filter two hundred
  times. Cost is multiplied by the result set.
- **Bail out before cloning.** Decide whether you have anything to change and return the
  manifest untouched if not. This is the single most effective thing you can do.
- **Clone once, then mutate that copy.** Do not clone per pass when rules stack up.
- **Hoist per-manifest work out of per-version loops** — name matching, config parsing, building
  a `Date`. Recomputing per version is the other double loop.
- **The manifest you get is a shallow copy.** `versions`, `dist-tags`, `time` and `_distfiles`
  are the caller's objects; editing them in place corrupts what Verdaccio persists. Clone the
  containers you touch.
- **Removing versions leaves debris**: `dist-tags` can point at a version that no longer exists,
  `latest` included, which breaks `npm install`. Repair what you break.
- **No I/O.** The method is `async`, which makes a network call look acceptable. It is not.

## What a filter cannot do

Tarball, user, profile and token requests do not pass through filters, so hiding a version does
not prevent downloading its tarball. And a filter that throws is logged and skipped — the
request continues with unfiltered metadata. **It fails open, so it is not a security boundary.**

## Reference

- https://verdaccio.org/dev/plugin-filter
- The reference implementation: `@verdaccio/package-filter` in the Verdaccio repository.
