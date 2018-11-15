
'use strict';

module.exports = function(app) {
    var todoList = require('./todoListController');
    let verifyToken = require('../../middleware/verifyToken');
    let checkOwnerId = require('../../middleware/checkId');
    app.route('/lists')
        .get(verifyToken, todoList.list_all_lists)
        .post(verifyToken, todoList.create_a_list)
        .delete(verifyToken, checkOwnerId, todoList.delete_a_list);
    app.route('/lists/:listId')
        .get(verifyToken, checkOwnerId, todoList.read_a_list)
        .post(verifyToken, checkOwnerId, todoList.add_task_to_list)
        .delete(verifyToken, checkOwnerId, todoList.delete_task_from_list);
};