/**
 * Custom Verdaccio Authenticate Plugin.
 */
class AuthCustomPlugin {
	constructor() {
		return this;
	}
	/**
	 * authenticate an user
	 * @param user user to log
	 * @param password provided password
	 * @param cb callback function
	 */
	authenticate(user, password, cb) {
		// here your code
	}

	/**
	 * check grants for such user
	 */
	allow_access() {
		// in case of restrict the access
	}

	/**
	 * 
	 */
	allow_publish() {
		// 
	}
}

module.exports = ()=> {
	return Object.create(AuthPlugin.prototype);
};