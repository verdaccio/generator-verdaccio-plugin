# Auth Plugin

An auth plugin controls **who can log in** to Verdaccio and **what they are allowed to do** (access, publish, unpublish packages).

## Scaffold

```bash
yo verdaccio-plugin
# select: Auth
# plugin name: my-auth
```

This creates `verdaccio-my-auth/` with the auth plugin boilerplate.

## Register in `verdaccio.yaml`

```yaml
auth:
  verdaccio-my-auth:
    foo: bar # custom config fields (see CustomConfig below)
```

## Custom Configuration

Extend `Config` from `@verdaccio/types` to define the fields your plugin reads from `verdaccio.yaml`:

```ts
// types/index.ts
import { Config } from '@verdaccio/types';

export interface CustomConfig extends Config {
  foo: string;
  // add your own fields here
}
```

Verdaccio merges the `auth` block from `verdaccio.yaml` into `config` and passes it to your plugin constructor.

## Plugin Class

Your plugin must extend `pluginUtils.Plugin<CustomConfig>` and implement `pluginUtils.Auth<CustomConfig>`:

```ts
import { pluginUtils } from '@verdaccio/core';
import { Config, Logger, PackageAccess, RemoteUser } from '@verdaccio/types';
import { CustomConfig } from '../types';

export default class AuthPlugin
  extends pluginUtils.Plugin<CustomConfig>
  implements pluginUtils.Auth<CustomConfig>
{
  private logger: Logger;
  private config: CustomConfig;
  private appConfig: Config;

  public constructor(config: CustomConfig, options: pluginUtils.PluginOptions) {
    super(config, options);
    this.config = config;
    this.logger = options.logger;
    this.appConfig = options.config;
  }

  // --- required methods ---

  public authenticate(user: string, password: string, cb: pluginUtils.AuthCallback): void { ... }
  public allow_access(user: RemoteUser, pkg: PackageAccess, cb: pluginUtils.AccessCallback): void { ... }
  public allow_publish(user: RemoteUser, pkg: PackageAccess, cb: pluginUtils.AuthAccessCallback): void { ... }
}
```

## API Reference

### `constructor(config, options)`

| Parameter        | Type           | Description                                                             |
| ---------------- | -------------- | ----------------------------------------------------------------------- |
| `config`         | `CustomConfig` | Plugin config block from `verdaccio.yaml` merged with the global config |
| `options.logger` | `Logger`       | Verdaccio logger instance                                               |
| `options.config` | `Config`       | Full Verdaccio application config                                       |

---

### `authenticate(user, password, cb)`

Called when a user runs `npm login`.

| Parameter  | Type           | Description                                                |
| ---------- | -------------- | ---------------------------------------------------------- |
| `user`     | `string`       | Username supplied by the client                            |
| `password` | `string`       | Password supplied by the client                            |
| `cb`       | `AuthCallback` | Call `cb(null, [user])` on success; `cb(error)` on failure |

```ts
public authenticate(user: string, password: string, cb: pluginUtils.AuthCallback): void {
  if (isValid(user, password)) {
    // second argument is the list of groups the user belongs to
    return cb(null, [user, 'developers']);
  }
  return cb(errorUtils.getUnauthorized('invalid credentials'));
}
```

---

### `allow_access(user, pkg, cb)`

Called before Verdaccio serves a package tarball or metadata. Controls **read** access.

| Parameter | Type             | Description                                                              |
| --------- | ---------------- | ------------------------------------------------------------------------ |
| `user`    | `RemoteUser`     | Authenticated user (`{ name, groups, real_groups }`)                     |
| `pkg`     | `PackageAccess`  | Package config from `verdaccio.yaml` (`{ access, publish, ... }`)        |
| `cb`      | `AccessCallback` | Call `cb(null, true)` to allow; `cb(null, false)` or `cb(error)` to deny |

```ts
public allow_access(user: RemoteUser, pkg: PackageAccess, cb: pluginUtils.AccessCallback): void {
  const allowed = pkg?.access?.some(group =>
    group === '$all' || group === '$anonymous' || user.groups.includes(group)
  );
  cb(null, allowed ?? false);
}
```

---

### `allow_publish(user, pkg, cb)`

Called before Verdaccio accepts a `npm publish`. Controls **write** access.

| Parameter | Type                 | Description                                         |
| --------- | -------------------- | --------------------------------------------------- |
| `user`    | `RemoteUser`         | Authenticated user                                  |
| `pkg`     | `PackageAccess`      | Package config from `verdaccio.yaml`                |
| `cb`      | `AuthAccessCallback` | Call `cb(null, true)` to allow; `cb(error)` to deny |

```ts
public allow_publish(user: RemoteUser, pkg: PackageAccess, cb: pluginUtils.AuthAccessCallback): void {
  if (pkg?.publish?.includes(user.name)) {
    return cb(null, true);
  }
  return cb(errorUtils.getForbidden('not allowed to publish'));
}
```

---

### `allow_unpublish(user, pkg, cb)` _(optional)_

Called before Verdaccio accepts a `npm unpublish`. Falls back to `allow_publish` if not defined.

Same signature as `allow_publish`.

---

## Types Quick Reference

```ts
// RemoteUser
interface RemoteUser {
  name: string | undefined;
  groups: string[];
  real_groups: string[];
}

// PackageAccess
interface PackageAccess {
  access?: string[];
  publish?: string[];
  unpublish?: string[];
  proxy?: string[];
}

// Callbacks
type AuthCallback = (err: VerdaccioError | null, groups?: string[]) => void;
type AccessCallback = (err: VerdaccioError | null, allowed?: boolean) => void;
type AuthAccessCallback = (err: VerdaccioError | null, allowed?: boolean) => void;
```

## Common Error Helpers (`@verdaccio/core`)

```ts
import { errorUtils } from '@verdaccio/core';

errorUtils.getUnauthorized('message'); // HTTP 401
errorUtils.getForbidden('message'); // HTTP 403
errorUtils.getNotFound('message'); // HTTP 404
errorUtils.getServiceUnavailable(); // HTTP 503
```

## Build & Publish

```bash
cd verdaccio-my-auth
npm install
npm run build          # compiles TypeScript to lib/

# publish to your own Verdaccio instance for testing
npm publish --registry http://localhost:4873
```

Then add the plugin to your `verdaccio.yaml`, install it in the Verdaccio instance and restart.
