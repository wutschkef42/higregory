
'use strict';

module.exports = function(app) {
    var todoList = require('./todoListController');
    let verifyToken = require('../../middleware/verifyToken');
    let checkId = require('../../middleware/checkId');
    app.route('/lists')
        .get(verifyToken, todoList.list_all_lists)
        .post(verifyToken, todoList.create_a_list);
    app.route('/lists/:listId')
        .get(todoList.read_a_list)
        .post(todoList.add_task_to_list)
        .delete(todoList.delete_task_from_list);
};