/**
 * Custom Verdaccio Authenticate Plugin.
 */
class AuthCustomPlugin {
	constructor() {
		return this;
	}
	/**
	 * Authenticate an user.
	 * @param user user to log
	 * @param password provided password
	 * @param cb callback function
	 */
	authenticate(user, password, cb) {
		// here your code
	}

	/**
	 * check grants for such user.
	 */
	allow_access() {
		// in case of restrict the access
	}

	/**
	 * check grants to publish
	 */
	allow_publish() {
		// in cass to check if has permission to publish
	}
}

module.exports = (config, stuff)=> {
	return new AuthCustomPlugin(config, stuff);
};