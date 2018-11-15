
'use strict';
module.exports = function(app) {
    var verifyToken = require('../middleware/verifyToken');
    var auth = require('./authController');

    app.route('/register')
        .post(auth.sign_up_user);
    app.route('/login')
       .post(auth.login_user);
    app.route('/logout')
        .get(auth.logout_user);
    app.route('/me')
        .get(verifyToken, auth.who_am_i);
}