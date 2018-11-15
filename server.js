
const dotenv = require('dotenv');
dotenv.config();

var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	Task = require('./api/todoItem/todoItemModel'),
	User = require('./user/userModel'),
	List = require('./api/todoList/todoListModel'),
	db = require('./db'),
	bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var todoListRoutes = require('./api/todoList/todoListRoutes');
todoListRoutes(app);
var todoItemRoutes = require('./api/todoItem/todoItemRoutes');
todoItemRoutes(app);
var authRoutes = require('./auth/authRoutes');
authRoutes(app);
var userRoutes = require('./user/userRoutes');
userRoutes(app);

app.listen(port);

app.use(function(req, res) {
	res.status(404).send({ url: req.originalUrl + ' not found' })
});

console.log('RESTful API server started on ' + port + '!');
