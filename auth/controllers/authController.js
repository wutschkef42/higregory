
'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('Users');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');
var VerifyToken = require('../verifyToken');


/*
exports.sign_up_user = function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    },
    function(err, user) {
        if (err) return res.status(500).send("Error: User not registered.")
        var token = jwt.sign({ id: user._id  }, config.secret, {
            expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
    });
};
*/

exports.sign_up_user = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        const new_user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        if (!new_user) return res.status(500).send('Server error.');
        const token = jwt.sign({ id: new_user._id }, config.secret, {
            expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
    }
    catch (err) {
        res.status(500).send({ auth: false, token: null, error: err });
    }
}


/*
exports.login_user = function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) return res.status(500).send('Server error.');
        if (!user) return res.status(404).send('User not found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
    });
};
*/

exports.login_user = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).send({auth: false, token: null, message: 'No user found.'});
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: 'Invalid password.' });  
        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
    } 
    catch (err) {
        res.status(500).send({auth: false, token: null, message: 'Error: Server error.'});
    }
};


exports.logout_user = (req, res) => {
    res.status(200).send({ auth: false, token: null });
};

exports.who_am_i = (req, res) => {
        User.findById(req.userId, { password: 0 }, function(err, user) {
            if (err) return res.status(500).send("Error while looking for the user.");
            if (!user) return res.status(404).send("No user found.");
            res.status(200).send({ user: user });
        });
};

/*
router.get('/me', VerifyToken, function(req, res, next) {
  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
});
*/