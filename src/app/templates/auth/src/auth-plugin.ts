import debugCore from 'debug';

import {API_ERROR, errorUtils, pluginUtils} from '@verdaccio/core';
import {Config, Logger, PackageAccess, RemoteUser} from '@verdaccio/types';

import {CustomConfig} from '../types/index';

const {Plugin} = pluginUtils;

// Initialize debug logging
// Replace 'custom-auth-plugin' with your plugin name
// This code is meant to help during development and debugging
const debug = debugCore('verdaccio:plugin:custom-auth-plugin');

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
    debug('AuthCustomPlugin config: %o', this._config);
    debug('App Config: %o', this._app_config);
  }
  /**
   * Authenticate an user.
   * @param user user to log
   * @param password provided password
   * @param cb callback function
   */
  public authenticate(user: string, password: string, cb: pluginUtils.AuthCallback): void {
    debug('Authenticating user: %o', user);
    debug('Password: %o', password);

    // TODO: replace this code with your own authentication logic
    // TODO: replace this code with your own authentication logic
    // TODO: replace this code with your own authentication logic
    if (password === 'verdaccio') {
      this._logger.info(`User @{user} authenticated successfully`);
      debug('User @{user} authenticated successfully', {user});
      return cb(null, [user]);
    } else {
      this._logger.error(`User @{user} authentication failed`);
      return cb(errorUtils.getUnauthorized(API_ERROR.BAD_USERNAME_PASSWORD));
    }
    // TODO: replace this code with your own authentication logic
    // TODO: replace this code with your own authentication logic
    // TODO: replace this code with your own authentication logic
  }

  public allow_access(user: RemoteUser, pkg: PackageAccess, cb: pluginUtils.AccessCallback): void {
    debug('allow access for %o', user);
    debug('package access list %o', pkg?.access);
    // TODO: replace this code with your own access logic
    // TODO: replace this code with your own access logic
    // TODO: replace this code with your own access logic
    if (pkg?.access?.includes('$anonymous')) {
      debug('%o has been granted access', user?.name);
      this._logger.info('Anonymous user granted access to package');
      return cb(null, true);
    } else if (pkg?.access?.includes('$all')) {
      debug('%o has been granted access', user?.name);
      this._logger.info('All users granted access to package');
      return cb(null, false);
    }
    // TODO: replace this code with your own access logic
    // TODO: replace this code with your own access logic
    // TODO: replace this code with your own access logic
  }

  public allow_publish(
      user: RemoteUser,
      pkg: PackageAccess,
      cb: pluginUtils.AuthAccessCallback,
  ): void {
    // TODO: replace this code with your own publish logic
    // TODO: replace this code with your own publish logic
    // TODO: replace this code with your own publish logic
    // TODO: replace this code with your own publish logic
    debug('allow publish for %o', user);
    debug('package publish access list %o', pkg?.publish);
    if (user?.name === 'verdaccio') {
      debug('%o has been granted to publish', user?.name);
      return cb(null, true);
    } else {
      const err = errorUtils.getForbidden('not allowed to publish package');
      this._logger.error('%o not allowed to publish package');
      debug('%o not allowed to publish package err %o', user?.name, err.message);
      return cb(err);
    }
    // TODO: replace this code with your own publish logic
    // TODO: replace this code with your own publish logic
    // TODO: replace this code with your own publish logic
  }
}
