# Working on this plugin

`<%= name %>` is a Verdaccio **middleware** plugin: it mounts Express routes on the registry.

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

class Plugin
  extends pluginUtils.Plugin<Config>
  implements pluginUtils.ExpressMiddleware<Config, Storage, Auth> {
  register_middlewares(app: Express, auth: Auth, storage: Storage): void
}
```

**Do not use `IPluginMiddleware`, `IPlugin`, `IBasicAuth<T>` or `@verdaccio/commons-api`.** Those
were removed years ago; they are still all over old tutorials and model training data. Errors
come from `errorUtils` in `@verdaccio/core`.

Note the type parameters are `<PluginConfig, Storage, Auth>` but the method receives **`auth`
before `storage`**. Use `unknown` for what you do not need.

## What you must know before writing routes

- **Your routes are registered before Verdaccio's own API.** If your path matches, you answer
  and the registry handler never runs. A bare `app.use(router)` with no prefix intercepts
  every request — mount on a prefix unless overriding is the point.
- **`req.body` is already parsed** (Verdaccio 7+). Reading the raw stream fails with
  `stream is not readable`. The limit is `max_body_size` from `config.yaml`, default 10mb.
- **`req.remote_user` is set**, except under `/-/verdaccio/`, the web UI namespace.
- **Express 5 route syntax.** `'/foo/*'`, `'/foo/:id?'` and `'/foo/:id(\d+)'` all **throw**.
  Use `'/foo/{*rest}'`, `'/foo{/:id}'`, and a plain param plus a check in the handler.
  These throw while registering, which means **Verdaccio does not start**.
- Call `next(err)` for errors; Verdaccio's handler formats them.

## Reference

- https://verdaccio.org/dev/plugin-middleware
- The contracts themselves: `pluginUtils` in `@verdaccio/core`.
