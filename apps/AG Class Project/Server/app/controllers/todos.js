//'use strict'
var express = require('express'),
	router = express.Router(),
	logger = require('../../config/logger');

passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
	app.use('/api', router);

	router.route('/todos').get(requireAuth,(req, res, next) => {
		logger.log('info', 'Get all todos');
		var query = Todo.find()
			.sort(req.query.order)
			.exec()
			.then(result => {
				if (result && result.length) {
					res.status(200).json(result);
				} else {
					res.status(404).json({ message: "No todos" });
				}
			})
			.catch(err => {
				return next(err);
			});
	});

	router.route('/todos/users/:id').get(requireAuth,(req, res, next) => {
		logger.log('info', 'Get all a users todos', req.params.id);
		var query = Todo.find({ userId: req.params.id })
			.sort(req.query.order)
			.exec()
			.then(result => {
				if (result && result.length) {
					res.status(200).json(result);
				} else {
					res.status(404).json({ message: "No todos" });
				}
			})
			.catch(err => {
				return next(err);
			});
	});

	router.route('/todos/:id').get(requireAuth,(req, res, next) => {
		logger.log('info', 'Get user todos', req.params.id);
		Todo.findById(req.params.id)
			.then(todo => {
				if (todo) {
					res.status(200).json(todo);
				} else {
					res.status(404).json({ message: "No todo found" });
				}
			})
			.catch(error => {
				return next(error);
			});
	});


	router.route('todos').post(requireAuth,(req, res, next) => {
		logger.log('info', '%s logging in', req.body.email);
		var email = req.body.email
		var password = req.body.password;

		var obj = { 'email': email, 'password': password };
		res.status(201).json(obj);
	});

	router.route('/todos/:id').put(requireAuth,(req, res, next) => {
		logger.log('info', 'Get user todos', req.params.id);
		Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
			.then(todo => {
				res.status(200).json(todo);
			})
			.catch(error => {
				return next(error);
			});
	});


	router.route('/todos/:id').delete(requireAuth,(req, res, next) => {
		logger.log('info', 'Delete user todo' + req.params.id);
		Todo.remove({ _id: req.params.id })
			.then(todo => {
				res.status(200).json({ msg: "Todo Deleted" });
			})
			.catch(error => {
				return next(error);
			});
	})

}

//not sure what happens here