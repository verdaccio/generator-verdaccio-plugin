import debugCore from 'debug';
import { PassThrough, Readable, Writable } from 'node:stream';

import { errorUtils, pluginUtils, searchUtils } from '@verdaccio/core';
import { Logger, Manifest, Token, TokenFilter } from '@verdaccio/types';

import { CustomConfig } from '../types/index';

// Initialize debug logging
// Replace 'custom-storage-plugin' with your plugin name
// This code is meant to help during development and debugging
const debug = debugCore('verdaccio:plugin:custom-storage-plugin');

/**
 * Per package storage handler.
 *
 * Verdaccio asks the plugin for one of these through `getPackageStorage()` and
 * then performs every read and write for that package through it.
 */
class PackageStorage implements pluginUtils.StorageHandler {
  public logger: Logger;
  private packageName: string;

  public constructor(packageName: string, logger: Logger) {
    this.packageName = packageName;
    this.logger = logger;
    debug('package storage created for %o', this.packageName);
  }

  public async hasPackage(): Promise<boolean> {
    debug('has package %o', this.packageName);
    // TODO: report whether the manifest exists in your backend
    throw errorUtils.getServiceUnavailable();
  }

  public async readPackage(name: string): Promise<Manifest> {
    debug('read package %o', name);
    // TODO: return the stored manifest, or throw errorUtils.getNotFound()
    throw errorUtils.getServiceUnavailable();
  }

  public async createPackage(name: string, manifest: Manifest): Promise<void> {
    debug('create package %o', name);
    debug('manifest %o', manifest.name);
    // TODO: persist a brand new manifest
    throw errorUtils.getServiceUnavailable();
  }

  public async savePackage(name: string, manifest: Manifest): Promise<void> {
    debug('save package %o', name);
    debug('manifest %o', manifest.name);
    // TODO: overwrite the stored manifest
    throw errorUtils.getServiceUnavailable();
  }

  /**
   * Read the manifest, hand it to `handleUpdate` and persist whatever comes
   * back. Verdaccio relies on this to apply a change atomically, so read and
   * write should not be observable as two separate steps.
   */
  public async updatePackage(
    name: string,
    handleUpdate: (manifest: Manifest) => Promise<Manifest>
  ): Promise<Manifest> {
    debug('update package %o', name);
    // TODO: read, apply handleUpdate, then save the result
    const manifest = await this.readPackage(name);
    return handleUpdate(manifest);
  }

  public async deletePackage(fileName: string): Promise<void> {
    debug('delete file %o from %o', fileName, this.packageName);
    // TODO: remove a single file (a manifest or a tarball)
    throw errorUtils.getServiceUnavailable();
  }

  public async removePackage(name: string): Promise<void> {
    debug('remove package %o', name);
    // TODO: remove the package and everything stored under it. On an object
    // store there is no folder to delete — enumerate the objects sharing the
    // package prefix and delete each one, or the tarballs are left orphaned.
    throw errorUtils.getServiceUnavailable();
  }

  public async hasTarball(fileName: string): Promise<boolean> {
    debug('has tarball %o', fileName);
    // TODO: report whether the tarball exists
    throw errorUtils.getServiceUnavailable();
  }

  public async readTarball(fileName: string, { signal }: { signal: AbortSignal }): Promise<Readable> {
    debug('read tarball %o', fileName);
    debug('aborted %o', signal.aborted);
    // TODO: return a readable stream of the tarball bytes. The signal is tied
    // to the client request; abort the underlying read when it fires.
    throw errorUtils.getServiceUnavailable();
  }

  /**
   * Return the stream Verdaccio pipes the uploaded tarball into.
   *
   * The event contract is strict and mistakes here fail silently:
   *
   * - `open` must be emitted **asynchronously**. Verdaccio attaches its
   *   listener after awaiting this method, so an `open` emitted synchronously
   *   — or on `process.nextTick`, which runs before promise continuations — is
   *   missed and the publish hangs with no error. `setImmediate` is safe.
   * - `close` must be emitted once the bytes are durable. It is what triggers
   *   the manifest update; without it the upload succeeds but no version is
   *   published.
   * - `error` must be emitted at most once. A second one can reach a stream
   *   that no longer has a listener, which takes the registry down.
   */
  public async writeTarball(
    fileName: string,
    { signal }: { signal: AbortSignal }
  ): Promise<Writable> {
    debug('write tarball %o', fileName);
    const stream = new PassThrough();
    let failed = false;

    const fail = (err: Error): void => {
      if (failed) {
        return;
      }
      failed = true;
      stream.emit('error', err);
    };

    signal.addEventListener('abort', () => fail(errorUtils.getInternalError('upload aborted')), {
      once: true,
    });

    // TODO: pipe `stream` into your backend and emit 'close' once the write is
    // durable. Emitting 'open' from setImmediate — never synchronously — is
    // what lets Verdaccio see it.
    setImmediate(() => {
      stream.emit('open');
      fail(errorUtils.getServiceUnavailable());
    });

    return stream;
  }
}

/**
 * Custom Verdaccio Storage Plugin.
 *
 * Every method returns a promise. The callback based contract that older
 * plugins use was dropped; do not reintroduce it.
 */
export default class StorageCustomPlugin
  extends pluginUtils.Plugin<CustomConfig>
  implements pluginUtils.Storage<CustomConfig>
{
  private readonly logger: Logger;

  public constructor(config: CustomConfig, options: pluginUtils.PluginOptions) {
    super(config, options);
    this.logger = options.logger;
    debug('StorageCustomPlugin config: %o', config);
  }

  public async init(): Promise<void> {
    debug('initializing storage');
    // TODO: open connections, create buckets, run migrations
  }

  /**
   * List every package name known to the storage. Verdaccio uses it to build
   * the private package index.
   */
  public async get(): Promise<string[]> {
    debug('get package list');
    // TODO: return the list of stored package names
    throw errorUtils.getServiceUnavailable();
  }

  public async add(name: string): Promise<void> {
    debug('add package %o to the list', name);
    // TODO: record the package name in the index
    throw errorUtils.getServiceUnavailable();
  }

  public async remove(name: string): Promise<void> {
    debug('remove package %o from the list', name);
    // TODO: drop the package name from the index
    throw errorUtils.getServiceUnavailable();
  }

  public getPackageStorage(packageName: string): pluginUtils.StorageHandler {
    debug('get package storage for %o', packageName);
    return new PackageStorage(packageName, this.logger);
  }

  /**
   * Answer `npm search`. Do the filtering here — Verdaccio does not call any
   * other method to narrow the result down.
   */
  public async search(query: searchUtils.SearchQuery): Promise<searchUtils.SearchItem[]> {
    debug('search %o', query.text);
    // TODO: return the packages matching the query
    throw errorUtils.getServiceUnavailable();
  }

  public async getSecret(): Promise<string> {
    debug('get secret');
    // TODO: return the persisted token secret
    throw errorUtils.getServiceUnavailable();
  }

  public async setSecret(secret: string): Promise<void> {
    debug('set secret');
    debug('secret length %o', secret.length);
    // TODO: persist the token secret
    throw errorUtils.getServiceUnavailable();
  }

  public async saveToken(token: Token): Promise<void> {
    debug('save token for user %o', token.user);
    // TODO: persist the token
    throw errorUtils.getServiceUnavailable();
  }

  public async deleteToken(user: string, tokenKey: string): Promise<void> {
    debug('delete token %o for user %o', tokenKey, user);
    // TODO: remove the token
    throw errorUtils.getServiceUnavailable();
  }

  public async readTokens(filter: TokenFilter): Promise<Token[]> {
    debug('read tokens for user %o', filter.user);
    // TODO: return the tokens matching the filter
    throw errorUtils.getServiceUnavailable();
  }
}
