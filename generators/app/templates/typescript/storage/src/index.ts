import {
  Logger,
  Callback,
  IPluginStorage,
  PluginOptions,
  IPackageStorage
} from "@verdaccio/types";

import { CustomConfig } from "../types/index";

export default class VerdaccioStoragePlugin
  implements IPluginStorage<CustomConfig> {
  public logger: Logger;
  public constructor(
    config: CustomConfig,
    options: PluginOptions<CustomConfig>
  ) {}

  public async getSecret(): Promise<string> {}

  public async setSecret(secret: string): Promise<any> {}

  /**
   * Add a new element.
   * @param {*} name
   * @return {Error|*}
   */
  public add(name: string, callback: Callback): void {}

  public search(
    onPackage: Callback,
    onEnd: Callback,
    validateName: Function
  ): void {}

  /**
   * Remove an element from the database.
   * @param {*} name
   * @return {Error|*}
   */
  public remove(name: string, callback: Callback): void {}

  /**
   * Return all database elements.
   * @return {Array}
   */
  public get(callback: Callback): void {}

  public getPackageStorage(packageInfo: string): IPackageStorage {}
}
