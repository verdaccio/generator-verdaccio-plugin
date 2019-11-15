import {
  Logger,
  IPluginMiddleware,
  IBasicAuth,
  IStorageManager,
  PluginOptions
} from "@verdaccio/types";

import { CustomConfig } from "../types/index";

export default class VerdaccioMiddlewarePlugin
  implements IPluginMiddleware<CustomConfig> {
  public _logger: Logger;
  public constructor(
    config: CustomConfig,
    options: PluginOptions<CustomConfig>
  ) {}

  public register_middlewares(
    app: any,
    auth: IBasicAuth,
    storage: IStorageManager
  ): void {}
}
