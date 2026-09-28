# Working on this plugin

`<%= name %>` is a Verdaccio **authentication** plugin: it decides who a user is and what they
may do.

## Verify your work

Two loops, both fast. Run them after every change; do not hand back code that fails either.

```bash
npm run build    # tsc — catches wrong type names and signatures
npm run verify   # checks the plugin exposes what Verdaccio will call
```

The compiler is the authority. If this file and `tsc` disagree, `tsc` is right.

## The contract

```ts
import { errorUtils, pluginUtils } from '@verdaccio/core';

class Plugin extends pluginUtils.Plugin<Config> implements pluginUtils.Auth<Config> {
  authenticate(user: string, password: string, cb: pluginUtils.AuthCallback): void
}
```

**Do not use `IPluginAuth`, `IPlugin` or `@verdaccio/commons-api`.** Those were removed years
ago; they are still all over old tutorials and model training data. Errors come from
`errorUtils` in `@verdaccio/core`.

This contract is **callback based** — there is no promise variant. Only `authenticate` is
required; `adduser`, `changePassword`, `allow_access`, `allow_publish`, `allow_unpublish` and
`allow_stage` are optional and fall back to Verdaccio's own behaviour.

## The chain, which is where mistakes happen

Verdaccio consults auth plugins in configuration order and appends its own last.

`authenticate` — **first success wins**:

| You call | Result |
| --- | --- |
| `cb(null, ['group'])` | authenticated, the rest are skipped |
| `cb(null, false)` | wrong credentials — **not** an error, the next plugin is tried |
| `cb(err)` | **the whole chain aborts** with that error |

So returning an error because your backend is unreachable stops every plugin listed after
yours. Return `false` unless you mean "nobody else should decide either".

`allow_access` and friends — **first grant wins**:

| You call | Result |
| --- | --- |
| `cb(null, true)` | granted, the rest are skipped |
| `cb(null, false)` | **not a veto** — the next plugin is asked, and may grant |
| `cb(err)` | denied, chain stops |

**You cannot deny with `false`.** A hard denial must be an error.

Returning a string instead of an array of groups throws a `TypeError`.

## Reference

- https://verdaccio.org/dev/plugin-auth
- The contracts themselves: `pluginUtils` in `@verdaccio/core`.
