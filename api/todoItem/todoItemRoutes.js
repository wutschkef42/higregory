
'use strict';
module.exports = function(app) {
	var todoItem = require('./todoItemController');

	app.route('/tasks')
		.get(todoItem.list_all_tasks)
		.post(todoItem.create_a_task);
	
	app.route('/tasks/:taskId')
		.get(todoItem.read_a_task)
		.put(todoItem.update_a_task)
		.delete(todoItem.delete_a_task);
};
