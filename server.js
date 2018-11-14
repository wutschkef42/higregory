
const dotenv = require('dotenv');
dotenv.config();

var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	Task = require('./api/models/todoListModel'),
	User = require('./user/models/userModel'),
	db = require('./db'),
	bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var todoListRoutes = require('./api/routes/todoListRoutes');
todoListRoutes(app);
var authRoutes = require('./auth/routes/authRoutes');
authRoutes(app);

app.listen(port);

app.use(function(req, res) {
	res.status(404).send({ url: req.originalUrl + ' not found' })
});

console.log('RESTful API server started on ' + port + '!');
