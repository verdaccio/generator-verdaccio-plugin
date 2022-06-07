"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Custom Verdaccio Authenticate Plugin.
 */
class AuthCustomPlugin {
  constructor(config, options) {
    this.logger = options.logger;
    this.foo = config.foo;
    return this;
  }
  /**
   * Authenticate an user.
   * @param user user to log
   * @param password provided password
   * @param cb callback function
   */


  authenticate(user, password, cb) {
    /**
     * This code is just an example for demostration purpose
      if (this.foo) {
        cb(null, ['group-foo', 'group-bar']);
      } else {
        cb('error, try again', false);
      }
    */
  }
  /**
   * Triggered on each access request
   * @param user
   * @param pkg
   * @param cb
   */


  allow_access(user, pkg, cb) {
    /**
     * This code is just an example for demostration purpose
    if (user.name === this.foo && pkg?.access?.includes[user.name]) {
      this.logger.debug({name: user.name}, 'your package has been granted for @{name}');
      cb(null, true)
    } else {
      this.logger.error({name: user.name}, '@{name} is not allowed to access this package');
      cb('error, try again', false);
    }
     */
  }
  /**
   * Triggered on each publish request
   * @param user
   * @param pkg
   * @param cb
   */


  allow_publish(user, pkg, cb) {
    /**
     * This code is just an example for demostration purpose
    if (user.name === this.foo && pkg?.access?.includes[user.name]) {
      this.logger.debug({name: user.name}, '@{name} has been granted to publish');
      cb(null, true)
    } else {
      this.logger.error({name: user.name}, '@{name} is not allowed to publish this package');
      cb('error, try again', false);
    }
     */
  }

  allow_unpublish(user, pkg, cb) {
    /**
     * This code is just an example for demostration purpose
    if (user.name === this.foo && pkg?.access?.includes[user.name]) {
      this.logger.debug({name: user.name}, '@{name} has been granted to unpublish');
      cb(null, true)
    } else {
      this.logger.error({name: user.name}, '@{name} is not allowed to publish this package');
      cb('error, try again', false);
    }
     */
  }

}

exports.default = AuthCustomPlugin;
//# sourceMappingURL=index.js.map