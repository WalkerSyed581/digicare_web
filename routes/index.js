const express = require('express')
const router = express.Router()
const ensureAuthenticated = require("./auth")
const path = require('path')
const bcrypt = require("bcrypt");
const passport = require('passport');
var User = require('../models').User;
var Patient = require('../models').Patient;
var Doctor = require('../models').Doctor;
var Caregiver = require('../models').Caregiver;
const db = require('../models');
const { body,check, validationResult } = require('express-validator');
const moment = require("moment")
const { Op } = require("sequelize")

var authUser;

// Login Form
router.get('/login', async (req, res) => {
  res.render('login', {
    layout: 'login',
  })
});

// Login Process
router.post('/login', async (req, res, next) => {
	passport.authenticate('local', 
		{ successRedirect: '/',
		failureRedirect: '/login'}
	)(req, res, next);
});

// logout
router.get('/logout', ensureAuthenticated,async (req, res) => {
  req.logout();
  res.render('login', {
    layout: 'login',
  })
});

router.get('/',ensureAuthenticated,async (req, res) => {
	console.log(req.user.role);
	var spec_user = null;
	if(req.user.role == "P"){
		spec_user = await Patient.findOne({
			where: {
				user_id: req.user.id
			}
		})
	} else if(req.user.role == "D"){
		spec_user = await Doctor.findOne({
			where: {
				user_id: req.user.id
			}
		})
	} else if(req.user.role == "C"){
		spec_user = await Caregiver.findOne({
			where: {
				user_id: req.user.id
			}
		})
	} else if(req.user.role == "A"){
		spec_user = await Admin.findOne({
			where: {
				user_id: req.user.id
			}
		})
	}
    res.render('dashboard',{
		loggedIn: req.isAuthenticated(),
		user: req.user,
		spec_user: spec_user,
		role_err: req.flash('role_err')
	});
});





module.exports = router