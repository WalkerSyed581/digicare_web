const express = require('express')
const router = express.Router()
const ensureAuthenticated = require("./auth")
const path = require('path')
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require('passport');
var User = require('../models').User;
const db = require('../models');
const path = require('path')
const { body,check, validationResult } = require('express-validator');
const moment = require("moment")
const { Op } = require("sequelize")

var authUser;

// Login Form
router.get('/login', async (req, res) => {
  res.render('pages/User_Login', {
    loginError: '',
    loggedIn: false
  });
});

// Login Process
router.post('/login', async (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next);
  // targetUser = await User.findOne({where:{email: req.body.username}});
  // if (targetUser != null) {
  //   if (req.body.password == targetUser.password) {
  //     authUser = req.body.username;
  //     console.log(req.body.username, " is logged in");
  //     res.redirect('/');
  //   }
  //   else {
  //     res.render('pages/User_Login', {
  //       loginError: 'Incorrect password!'
  //     })
  //   }
  // }
  // else {
  //   res.render('pages/User_Login', {
  //     loginError: 'Incorrect username!'
  //   })
  // }

});

// logout
router.get('/logout', ensureAuthenticated,async (req, res) => {
  req.logout();
  res.render('pages/User_Login',{
    loginError: 'You are logged out.',
    loggedIn: false
  });
});

router.get('/', async (req, res) => {
    res.render('pages/dashboard', {
      loginError: '',
      loggedIn: false
    });
});



router.get('/about',async (req,res)=>{
    var loggedIn = req.isAuthenticated();
    res.render('pages/about', {
        loggedIn: loggedIn
    })
})

module.exports = router