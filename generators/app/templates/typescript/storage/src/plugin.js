"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PackageStorage = _interopRequireDefault(require("./PackageStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VerdaccioStoragePlugin {
  constructor(config, options) {
    this.config = config;
    this.logger = options.logger;
  }
  /**
   *
   */


  async getSecret() {
    /**
     * return await resolveSecret();
     */
  }

  async setSecret(secret) {
    /**
     * return await getYourSecret();
     */
  }
  /**
   * Add a new element.
   * @param {*} name
   * @return {Error|*}
   */


  add(name, callback) {}
  /**
   * Perform a search in your registry
   * @param onPackage
   * @param onEnd
   * @param validateName
   */


  search(onPackage, onEnd, validateName) {
    /**
     * Example of implementation:
     * try {
     *  someApi.getPackages((items) => {
     *   items.map(() => {
     *     if (validateName(item.name)) {
     *       onPackage(item);
     *     }
     *   });
     *  onEnd();
     * } catch(err) {
     *   onEnd(err);
     * }
     * });
     */
  }
  /**
   * Remove an element from the database.
   * @param {*} name
   * @return {Error|*}
   */


  remove(name, callback) {
    /**
     * Example of implementation
      database.getPackage(name, (item, err) => {
        if (err) {
          callback(getInternalError('your own message here'));
        }
         // if all goes well we return nothing
        callback(null);
      }
    */
  }
  /**
   * Return all database elements.
   * @return {Array}
   */


  get(callback) {
    /*
      Example of implementation
      database.getAll((allItems, err) => {
        callback(err, allItems);
      })
    */
  }
  /**
   * Create an instance of the `PackageStorage`
   * @param packageInfo
   */


  getPackageStorage(packageInfo) {
    return new _PackageStorage.default(this.config, packageInfo, this.logger);
  }
  /**
   * All methods for npm token support
   * more info here https://github.com/verdaccio/verdaccio/pull/1427
   */


  saveToken(token) {
    throw new Error('Method not implemented.');
  }

  deleteToken(user, tokenKey) {
    throw new Error('Method not implemented.');
  }

  readTokens(filter) {
    throw new Error('Method not implemented.');
  }

}

exports.default = VerdaccioStoragePlugin;
//# sourceMappingURL=plugin.js.map