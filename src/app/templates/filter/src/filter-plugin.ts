import {  Config, Logger, Manifest } from '@verdaccio/types';

import debugCore from 'debug';
const debug = debugCore('verdaccio:plugin:filter');

import { CustomConfig } from '../types';
import { pluginUtils } from '@verdaccio/core';

export default class FilterPlugin extends pluginUtils.Plugin<CustomConfig> implements pluginUtils.ManifestFilter<CustomConfig> {
  private _logger: Logger;
  private _config: {};
  private _app_config: Config;
  public constructor(config: CustomConfig, appOptions: pluginUtils.PluginOptions) {
    super(config, appOptions);
    this._config = config;
    this._logger = appOptions.logger;
    this._app_config = appOptions.config;
    debug('FilterPlugin config: %o', this._config);
    debug('App Config: %o', this._app_config);
  }

  public async filter_metadata(packageInfo: Readonly<Manifest>): Promise<Manifest> {
    const newPackage: Manifest = { ...packageInfo };
    this._logger.info(`Filtering package metadata for package: ${packageInfo.name}`);
    debug('Original package metadata: %o', packageInfo);
    // TODO: do some filtering based on config
    return Promise.resolve(newPackage);
  }
}
