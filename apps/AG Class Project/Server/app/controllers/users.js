'use strict'

var express = require('express'),
  router = express.Router(),
  logger = require('../../config/logger'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

passportService = require('../../config/passport'),
  passport = require('passport');

  const requireLogin = passport.authenticate('local', { session: false });
  

module.exports = function (app, config) {
  app.use('/api', router);

  router.route('/users').post(requireLogin,(req, res, next) => {
    logger.log('info', 'Create user');
    // res.status(201).json({ message: 'Created user' });
    var user = new User(req.body);
    user.save()
      .then((err) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        return next(err);
      });
  });

  router.route('/users').get(requireLogin,(req, res, next) => {
    logger.log('info', 'Get all users');
    // res.status(200).json({ message: 'Got all users' });
    var query = User.find()
      .sort(req.query.order)
      .exec()
      .then(result => {
        if (result && result.length) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: "No users" });
        }
      })
      .catch(err => {
        return next(err);
      });
  });

  router.route('/users/:id').get(requireLogin,(req, res, next) => {
    logger.log('info', 'Get user %s', req.params.id);
    // res.status(200).json({ id: req.params.id });
    User.findById(req.params.id)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "No user found" });
        }
      })
      .catch(error => {
        return next(error);
      });
  });

  router.route('/users/login').post(requireLogin, login);

  // router.route('/users/login').post((req, res, next) => {
  //   logger.log('info', '%s logging in', req.body.email);
  //   var email = req.body.email
  //   var password = req.body.password;

  //   var obj = { 'email': email, 'password': password };
  //   res.status(201).json(obj);
  // });

  router.route('/users/:id').put(requireLogin,(req, res, next) => {
    logger.log('info', 'Get user %s', req.params.id);
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        return next(error);
      });
  });


  router.route('/users/:id').delete(requireLogin,(req, res, next) => {
    logger.log('info', 'Delete user ' + req.params.id);
    User.remove({ _id: req.params.id })
      .then(user => {
        res.status(200).json({ msg: "User Deleted" });
      })
      .catch(error => {
        return next(error);
      });
  })

};