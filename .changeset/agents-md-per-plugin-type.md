---
'generator-verdaccio-plugin': minor
---

generate an AGENTS.md with per-type plugin instructions

Scaffolded plugins now include an `AGENTS.md` written for coding assistants. The plugin
interfaces were renamed in Verdaccio 7 — `IPluginMiddleware`, `IPluginAuth`, `IPluginStorage`,
`IPackageStorage` and `@verdaccio/commons-api` are all gone — but years of tutorials still use
the old names, so an assistant with no context writes a plugin that does not compile.

Each plugin type gets its own file with the contract it has to implement, the mistakes that
type is prone to, and the two verification loops the scaffold already provides
(`npm run build` and `npm run verify`).
