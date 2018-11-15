
'use strict';
let task = require('../todoItem/todoItemModel');
var mongoose = require('mongoose');
var ListSchema = new mongoose.Schema({
    owner_id: {
        type: String,
        required: 'Please specify the list creator\'s user id'
    },
    tasks: [task.TaskSchema]
});

module.exports = mongoose.model('Lists', ListSchema);

