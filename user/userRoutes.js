
'use strict';
module.exports = function(app) {
    var user = require('./userController');

    app.route('/users')
        .get(user.get_all_users);

    app.route('/users/:userId')
        .get(user.get_user_by_id)
        .delete(user.delete_user_by_id)
        .put(user.update_user_by_id);  
}
