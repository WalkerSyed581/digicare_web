const express = require('express');
const router = express.Router();
var User = require('../models').User;
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

router.get('/doctor',ensureAuthenticated,HasRole("P"),async(req,res)=>{
    const spec_user = await Patient.findByPk(req.user.spec_id)

    
    Doctor.findAll().then(function (doctors) {
        res.render('dashboard',{
            loggedIn: req.isAuthenticated(),
            user: req.user,
            spec_user: spec_user,
            role_err: req.flash('role_err'),
            doctors: doctor
        });
    });
});

router.get('/doctor/:id/allow',ensureAuthenticated,HasRole("P"),async(req,res)=>{
    const spec_user = await Patient.findOne({
        where: {
            user_id: req.user.id
        }
    })

    const jane = await DoctorPatient.create({ 
        patient_id: req.user.id,
        doctor_id: req.params.id
    });

    const doctor = await Doctor.findByPk(req.params.id,{
        include: {
            model: User
        }
    })

    req.flash("doc_allow","Doctor " + doctor.name + " allowed to see your data")
    res.redirect('/')
});


// To Be Completed
router.get('/live_reading',ensureAuthenticated,HasRole("P"),async(req,res)=>{
    const spec_user = await Patient.findByPk(req.user.spec_id)

    
});


router.get('/analytics',ensureAuthenticated,HasRole("P"),async(req,res)=>{
    const spec_user = await Patient.findOne({
        where : {
            user_id: req.user.id
        }
    });

    SensorUserData.findAndCountAll({
        where: {
            patient_id: req.user.id
        },
        order: [timestamp],
        limit: 10,
        offset: 0,
        include: [
            {model : Sensor}
        ]
    }).then(function(result) {
        res.render('dashboard',{
            loggedIn: req.isAuthenticated(),
            user: req.user,
            spec_user: spec_user,
            readings: result
        });
    });  
});


router.post('/patient/:id/analytics',[
    // validate input
    check('start_date').not().isEmpty(),
    check('end_date').not().isEmpty(),
    ],ensureAuthenticated,HasRole("D"),async(req,res)=>{

    const spec_user = await Patient.findOne({
        where : {
            user_id: req.user.id
        }
    });


    SensorUserData.findAndCountAll({
        where: {
            patient_id: req.params.id,
            timestamp: {
                [Op.gte] : req.body.start_date.toDate(),
                [Op.lt] : req.body.end_date.toDate()
            }
        },
        order: [timestamp],
        limit: 10,
        offset: 0,
        include: [
            {model : Sensor}
        ]
    }).then(function (result) {
        res.render('dashboard',{
            loggedIn: req.isAuthenticated(),
            user: req.user,
            spec_user: spec_user,
            readings: result
        });
    });  
});


module.exports = router
