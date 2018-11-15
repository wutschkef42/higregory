
'use strict';
var mongoose = require('mongoose');
var Task = mongoose.model('Tasks');


exports.list_all_tasks = async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.status(200).send({ tasks: tasks });
	}
	catch (err) {
		res.status(500).send({ error: err, message: 'Server error.' });
	}
}


exports.create_a_task = async (req, res) => {
	try {
		const new_task = await Task.create(req.body);
		res.json(new_task);
	}
	catch (err) {
		res.status(500).json({ error: err, message: 'cannot create a task' });
	}
}


exports.read_a_task = async (req, res) => {
	try {
		const task = await Task.findById(req.params.taskId);
		res.status(200).json(task);
	}
	catch (err) {
		res.status(500).json({ error: err, message: 'Cannot read task.' });
	}
}
 

exports.update_a_task = async (req, res) => {
	try {
		const task = await Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, {new: true });
		res.status(200).json(task);
	}
	catch (err) {
		res.status(500).json({ error: err, message: 'Cannot update task.' });
	}
}


exports.delete_a_task = async (req, res) => {
	try {
		await Task.remove({ _id: req.params.taskId });
		res.status(200).json({ message: 'Task succesfully deleted' });
	}
	catch (err) {
		re.status(500).json({ error: err, message: 'Error while deleting task' });
	}
}