class VerdaccioStoragePlugin {
  constructor(config, options) {}

  getSecret() {}

  setSecret(secret) {}

  /**
   * Add a new element.
   * @param {*} name
   * @return {Error|*}
   */
  add(name, cb) {}

  search(onPackage, onEnd, validateName) {}

  /**
   * Remove an element from the database.
   * @param {*} name
   * @return {Error|*}
   */
  remove(name, cb) {}

  /**
   * Return all database elements.
   * @return {Array}
   */
  get(cb) {}

  getPackageStorage(packageName) {}
}

module.exports = (config, options) => {
  return new VerdaccioStoragePlugin(config, options);
};
