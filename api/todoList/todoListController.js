
'use strict';
var mongoose = require('mongoose');
var List = mongoose.model('Lists');
var Task = mongoose.model('Tasks');

exports.list_all_lists = async (req, res) => {
    try {
        const lists = await List.find({});
        res.status(200).send({ lists: lists });
    }
    catch (err) {
        res.status(500).send({ error: err, message: 'Server error.'});
    }
}

exports.create_a_list = async (req, res) => {
    try {
        console.log(req.userId);
        const new_list = await List.create({
            owner_id: req.userId,
            tasks: []
        });
        res.status(200).json(new_list);
    }
    catch (err) {
        res.status(500).send({ error: err, message: 'Server error.'});
    }
}

exports.read_a_list = async (req, res) => {
    try {
        const list = await List.findById(req.params.listId);
        res.status(200).json(list);
    }
    catch (err) {
        res.status(500).send({ error: err, message: 'Server error.' });
    }
}

exports.add_task_to_list = async (req, res) => {
    try {
        let task = await Task.create({ name: req.body.name });
        await List.findByIdAndUpdate(req.params.listId,
            { $push: { tasks: task } },
            { safe: true, upsert: true });
        res.status(200).send('Task has been added.');
    }
    catch (err) {
        res.status(500).send({ error: err, message: 'Server error. '});
    }
}

exports.delete_task_from_list = async (req, res) => {
    try {
        let task = await Task.findById(req.body.taskId);
        if (!task) res.status(404).send('Task not found.');
        await List.findByIdAndUpdate(req.params.listId,
            { $pull: { tasks: task }},
            { safe: true, upsert: true });
        res.status(200).send('Task has been deleted.');
    }
    catch (err) {
        res.status(500).send('Server error.');
    }
}