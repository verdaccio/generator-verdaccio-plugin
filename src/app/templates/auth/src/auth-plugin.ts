import {API_ERROR, errorUtils, pluginUtils} from '@verdaccio/core';
import {
  AuthAccessCallback,
  AuthCallback,
  Config,
  Logger,
  PackageAccess,
  RemoteUser,
} from '@verdaccio/types';

import {CustomConfig} from '../types/index';

const {Plugin} = pluginUtils;

/**
 * Custom Verdaccio Authenticate Plugin.
 */
export default class AuthCustomPlugin
  extends Plugin<CustomConfig>
  implements pluginUtils.Auth<CustomConfig> {
  private _logger: Logger;
  private _config: {};
  private _app_config: Config;
  public constructor(config: CustomConfig, appOptions: pluginUtils.PluginOptions) {
    super(config, appOptions);
    this._config = config;
    this._logger = appOptions.logger;
    this._app_config = appOptions.config;
  }
  /**
   * Authenticate an user.
   * @param user user to log
   * @param password provided password
   * @param cb callback function
   */
  public authenticate(user: string, password: string, cb: AuthCallback): void {
    /**
     * This code is just an example for demostration purpose
      if (this.foo) {
        cb(null, ['group-foo', 'group-bar']);
      } else {
        cb(getInternalError("error, try again"), false);
      }
    */
  }

  /**
   * Triggered on each access request
   * @param user
   * @param pkg
   * @param cb
   */
  public allow_access(user: RemoteUser, pkg: PackageAccess, cb: AuthAccessCallback): void {
    /**
     * This code is just an example for demostration purpose
    if (user.name === this.foo && pkg?.access?.includes[user.name]) {
      this.logger.debug({name: user.name}, 'your package has been granted for @{name}');
      cb(null, true)
    } else {
      this.logger.error({name: user.name}, '@{name} is not allowed to access this package');
       cb(getInternalError("error, try again"), false);
    }
     */
  }

  /**
   * Triggered on each publish request
   * @param user
   * @param pkg
   * @param cb
   */
  public allow_publish(user: RemoteUser, pkg: PackageAccess, cb: AuthAccessCallback): void {
    /**
     * This code is just an example for demostration purpose
    if (user.name === this.foo && pkg?.access?.includes[user.name]) {
      this.logger.debug({name: user.name}, '@{name} has been granted to publish');
      cb(null, true)
    } else {
      this.logger.error({name: user.name}, '@{name} is not allowed to publish this package');
       cb(getInternalError("error, try again"), false);
    }
     */
  }

  public allow_unpublish(user: RemoteUser, pkg: PackageAccess, cb: AuthAccessCallback): void {
    /**
     * This code is just an example for demostration purpose
    if (user.name === this.foo && pkg?.access?.includes[user.name]) {
      this.logger.debug({name: user.name}, '@{name} has been granted to unpublish');
      cb(null, true)
    } else {
      this.logger.error({name: user.name}, '@{name} is not allowed to publish this package');
      cb(getInternalError("error, try again"), false);
    }
     */
  }
}
