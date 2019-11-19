class VerdaccioMiddlewarePlugin {
  constructor(config, options) {}
  register_middlewares(app, auth, storage) {}
}

module.exports = (config, options) => {
  return new VerdaccioMiddlewarePlugin(config, options);
};
