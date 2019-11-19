import {
  PluginOptions,
  Callback,
  PackageAccess,
  IPluginAuth,
  RemoteUser,
  Logger
} from "@verdaccio/types";

import { CustomConfig } from "../types/index";

/**
 * Custom Verdaccio Authenticate Plugin.
 */
export default class AuthCustomPlugin implements IPluginAuth<CustomConfig> {
  public _logger: Logger;
  public constructor(
    config: CustomConfig,
    options: PluginOptions<CustomConfig>
  ) {
    return this;
  }
  /**
   * Authenticate an user.
   * @param user user to log
   * @param password provided password
   * @param cb callback function
   */
  public authenticate(user: string, password: string, cb: Callback): void {
    // here your code
  }

  /**
   * check grants for such user.
   */
  public allow_access(
    user: RemoteUser,
    pkg: PackageAccess,
    cb: Callback
  ): void {
    // in case of restrict the access
  }

  /**
   * check grants to publish
   */
  public allow_publish(
    user: RemoteUser,
    pkg: PackageAccess,
    cb: Callback
  ): void {
    // in cass to check if has permission to publish
  }
}
