const express = require('express');
const router = express.Router();
var Patient = require('../models').Patient;
var SensorUserData = require('../models').SensorUserData;
var Assessment = require('../models').Assessment;
const { body,check, validationResult } = require('express-validator');
const {ensureAuthenticated,HasRole,VerifyAccess} = require("./auth")
const moment = require("moment")
const { Op } = require("sequelize")


router.get('/readings',ensureAuthenticated,HasRole("P"),async(req,res)=>{
    const patient = await Patient.findByPk(req.user.spec_id)

    SensorUserData.findAndCountAll({
        where: {
            patient_id: req.user.spec_id
        },
        order: [timestamp],
        limit: 10,
        offset: 0,
    }).then(function (result) {
        res.render('dashboard',{
            patient : patient,
            readings: result
        });
    });
});

router.get('/readings/:id',ensureAuthenticated,HasRole("P"),async(req,res)=>{
    const spec_user = await Patient.findByPk(req.user.spec_id)

    SensorUserData.findOne({
        where: {
            id: req.query.id
        }
    }).then(function (result) {
        res.render('dashboard',{
            loggedIn: req.isAuthenticated(),
            user: req.user,
            spec_user: spec_user,
            role_err: req.flash('role_err'),
            readings: result
        });
    });
});


router.get('/assessment',ensureAuthenticated,HasRole("P"),async(req,res)=>{
    const patient = await Patient.findByPk(req.user.spec_id)

    Assessment.findAndCountAll({
        where: {
            patient_id: req.user.spec_id
        },
        order: [timestamp],
        limit: 10,
        offset: 0,
    }).then(function (result) {
        res.render('dashboard',{
            patient : patient,
            readings: result
        });
    });
});

router.get('/assessment/:id',ensureAuthenticated,HasRole("P"),async(req,res)=>{
    const spec_user = await Patient.findByPk(req.user.spec_id)

    Assessment.findOne({
        where: {
            id: req.query.id
        }
    }).then(function (result) {
        res.render('dashboard',{
            loggedIn: req.isAuthenticated(),
            user: req.user,
            spec_user: spec_user,
            role_err: req.flash('role_err'),
            readings: result
        });
    });
});

module.exports = router
