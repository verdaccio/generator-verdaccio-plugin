module.exports = class StoragePluginManage {
  constructor(name, helper, config, logger) {}

  updatePackage(name, updateHandler, onWrite, transformPackage, onEnd) {}

  deletePackage(fileName, cb) {}

  removePackage(callback) {}

  createPackage(name, metadata, cb) {}

  savePackage(name, value, cb) {}

  readPackage(name, cb) {}

  writeTarball(name) {}

  readTarball(name) {}
};
