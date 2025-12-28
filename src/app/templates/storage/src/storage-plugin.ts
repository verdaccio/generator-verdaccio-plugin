/* eslint-disable @typescript-eslint/no-unused-vars */
import debugCore from 'debug';

import {errorUtils, searchUtils} from '@verdaccio/core';
import {Callback, Config, Logger} from '@verdaccio/types';

// Initialize debug logging
// Replace 'custom-auth-plugin' with your plugin name
// This code is meant to help during development and debugging
const debug = debugCore('verdaccio:plugin:custom-storage-plugin');

class LocalDatabase {
  public config: Config;
  public logger: Logger;

  public constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;
    debug('LocalDatabase config: %o', this.config);
    debug('Logger instance: %o', this.logger);
  }

  public getSecret(): Promise<string> {
    debug('Getting secret');
    return Promise.reject(errorUtils.getServiceUnavailable());
  }

  public setSecret(_secret: string): Promise<Error | null> {
    debug('Setting secret');
    return Promise.resolve(errorUtils.getServiceUnavailable());
  }

  public add(_name: string, cb: Callback): void {
    debug('Adding package: %o', _name);
    cb(errorUtils.getServiceUnavailable());
  }

  public async filterByQuery(
      _results: searchUtils.SearchItemPkg[],
      _query: searchUtils.SearchQuery,
  ): Promise<searchUtils.SearchItemPkg[]> {
    throw errorUtils.getServiceUnavailable();
  }

  public async getScore(_pkg: searchUtils.SearchItemPkg): Promise<searchUtils.Score> {
    throw errorUtils.getServiceUnavailable();
  }

  public async search(_query: searchUtils.SearchQuery): Promise<searchUtils.SearchItem[]> {
    throw errorUtils.getServiceUnavailable();
  }

  public remove(_name: string, cb: Callback): void {
    cb(errorUtils.getServiceUnavailable());
  }

  public get(cb: Callback): void {
    cb(errorUtils.getServiceUnavailable());
  }

  public getPackageStorage(_packageName: string) {
    throw errorUtils.getServiceUnavailable();
  }

  public clean(): void {
    throw errorUtils.getServiceUnavailable();
  }
}

export default LocalDatabase;
