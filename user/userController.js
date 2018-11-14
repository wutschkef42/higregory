
'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('Users');


/*
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});
*/

exports.get_all_users = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({users: users});
    }
    catch (err) {
        res.status(500).send({ error: err });
    }
}



/*
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});
*/

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



/*
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});
*/

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


/*
router.put('/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});
*/

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