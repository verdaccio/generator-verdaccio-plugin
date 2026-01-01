/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { type Express, type Request, type Response } from 'express';

import type { Auth } from '@verdaccio/auth';
import { pluginUtils } from '@verdaccio/core';
import { Logger } from '@verdaccio/types';

import { CustomConfig } from '../types';

export default class ProxyAudit
  extends pluginUtils.Plugin<CustomConfig>
  implements pluginUtils.ExpressMiddleware<CustomConfig, {}, Auth>
{
  readonly logger: Logger;
  public constructor(config: CustomConfig, options: pluginUtils.PluginOptions) {
    super(config, options);
    this.logger = options.logger;
  }

  // TODO: implement your middleware logic here
  // TODO: implement your middleware logic here
  // TODO: implement your middleware logic here
  // TODO: implement your middleware logic here
  public register_middlewares(app: Express, _auth: Auth): void {
    /* eslint new-cap:off */
    const router = express.Router();
    /* eslint new-cap:off */

    router.post('/custom-endpoint', express.json({ limit: '10mb' }), (req, res, next) => {
      this.logger.info({ method: req.method, url: req.url }, 'middleware-demo: incoming request');
      res.setHeader('x-verdaccio-middleware', 'demo');
      next();
    });

    app.use('/-/npm/v2/my-middleware-endpoint', router);
  }
  // TODO: implement your middleware logic here
  // TODO: implement your middleware logic here
  // TODO: implement your middleware logic here
  // TODO: implement your middleware logic here
}
