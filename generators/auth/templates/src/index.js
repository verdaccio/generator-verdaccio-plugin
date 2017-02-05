/**
 * Custom Verdaccio Authenticate Plugin.
 */
class AuthPlugin {
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

    }

    /**
     * check grants for such user
     */
    allow_access() {

    }

    /**
     * 
     */
    allow_publish() {

    }
}
export default AuthPlugin;