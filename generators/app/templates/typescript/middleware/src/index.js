"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class VerdaccioMiddlewarePlugin {
  constructor(config, options) {
    this.foo = config.foo !== undefined ? config.strict_ssl : true;
    this.logger = options.logger;
  }

  register_middlewares(app, auth,
  /* eslint @typescript-eslint/no-unused-vars: off */
  _storage) {
    /**
     * This is just an example of implementation
    // eslint new-cap:off
      const router = Router();
      router.post(
        '/custom-endpoint',
        (req: Request, res: Response & { report_error?: Function }, next: NextFunction): void => {
          const encryptedString = auth.aesEncrypt(Buffer.from(this.foo, 'utf8'));
          res.setHeader('X-Verdaccio-Token-Plugin', encryptedString.toString());
          next();
        }
      );
      app.use('/-/npm/something-new', router);
    */
  }

}

exports.default = VerdaccioMiddlewarePlugin;
//# sourceMappingURL=index.js.map