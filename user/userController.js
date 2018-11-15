
'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('Users');


exports.get_all_users = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({users: users});
    }
    catch (err) {
        res.status(500).send({ error: err });
    }
}


exports.get_user_by_id = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).send('User not found.');
        res.status(200).send({ user: user });
    }
    catch (err)
    {
        res.status(500).send({ error: err });
    }
}


exports.delete_user_by_id = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.userId);
        res.status(200).send('User: ' + user.name + ' was deleted.');
    }
    catch (err)
    {
        res.status(500).send('There was a problem deleting the user.');
    }
}


exports.update_user_by_id = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        res.status(200).send('User: ' + user.name + ' was updated.');
    }
    catch (err)
    {
        res.status(500).send('There was a problem updating the user.');
    }
}