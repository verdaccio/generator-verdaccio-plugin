import {
  Callback,
  Logger,
  Package,
  ILocalPackageManager
} from "@verdaccio/types";
import { UploadTarball, ReadTarball } from "@verdaccio/streams";

import { CustomConfig } from "../types/index";
export default class StoragePluginManage implements ILocalPackageManager {
  public logger: Logger;

  public constructor(
    config: CustomConfig,
    packageName: string,
    logger: Logger
  ) {}

  public updatePackage(
    name: string,
    updateHandler: Callback,
    onWrite: Callback,
    transformPackage: Function,
    onEnd: Callback
  ): void {}

  public deletePackage(fileName: string, callback: Callback): void {}

  public removePackage(callback: (err: Error | null) => void): void {}

  public createPackage(
    name: string,
    value: Package,
    callback: Function
  ): void {}

  public savePackage(name: string, value: Package, callback: Function): void {}

  public readPackage(name: string, callback: Function): void {}

  public writeTarball(name: string): UploadTarball {}

  public readTarball(name: string): ReadTarball {}
}
