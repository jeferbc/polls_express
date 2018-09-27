var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if(err) {
      console.log(err.message);
      return res.render('register', { error: err.message });
    }
    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if(err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    // Generate a JSON response reflecting authentication status
    if(!user) {
      return res.render('login', { error: info.message });
    }
    req.login(user, loginErr => {
      if(loginErr) {
        return next(loginErr);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
