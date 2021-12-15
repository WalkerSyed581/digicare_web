const express = require('express');
const router = express.Router();
var Patient = require('../models').Patient;
var Doctor = require('../models').Doctor;
var SensorUserData = require('../models').SensorUserData;
var Assessment = require('../models').Assessment;
var DoctorPatient = require('../models').DoctorPatient;
const { body,check, validationResult } = require('express-validator');
const {ensureAuthenticated,HasRole,VerifyAccess} = require("./auth")
const moment = require("moment")
const { Op } = require("sequelize")

router.get('/patient',ensureAuthenticated,HasRole("D"),async(req,res)=>{

    const spec_user = await Doctor.findOne({
        where: {
            user_id: req.user.id
        }
    });

    const patients_id = await DoctorPatient.findAll({
        where: {
            doctor_id: req.user.id
        }
    });

    console.log(patients_id);

    const patients = await Patient.findAll({
        where: {
            patient_id: patients_id.patient_id
        }
    })

    res.render('dashboard',{
        loggedIn: req.isAuthenticated(),
        user: req.user,
        spec_user: spec_user,
        role_err: req.flash('role_err'),
        patients: patients
    })

});

router.get('/patient/:id',ensureAuthenticated,HasRole("D"),async(req,res)=>{

    const spec_user = await Doctor.findOne({
        where: {
            user_id: req.user.id
        }
    });

    const patient = await Patient.findOne({
        where: {
            patient_id: req.params.id
        }
    })

    res.render('dashboard',{
        loggedIn: req.isAuthenticated(),
        user: req.user,
        spec_user: spec_user,
        role_err: req.flash('role_err'),
        patient: patient
    })
});

router.get('/patient/:id/reading',ensureAuthenticated,HasRole("D"),VerifyAccess(req.user.id,req.query.id),async(req,res)=>{
    const spec_user = await Doctor.findByPk(req.user.id)

    SensorUserData.findOne({
        where: {
            id: req.params.id
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


router.get('/patient/:id/assessment/add',ensureAuthenticated,HasRole("D"),VerifyAccess(req.user.id,req.query.id),async(req,res)=>{
     
    const spec_user = await Doctor.findByPk(req.params.id)

    
    res.render('dashboard',{
        loggedIn: req.isAuthenticated(),
        user: req.user,
        spec_user: spec_user,
        role_err: req.flash('role_err'),
        readings: result
    });
});

router.get('/patient/:id/assessment/',
            ensureAuthenticated,
            HasRole("D"),
            VerifyAccess(req.user.id,req.query.id),
            async(req,res)=>{
    const spec_user = await Doctor.findByPk(req.query.id)



    Assessment.findAndCountAll({
        where: {
            patient_id: req.params.id
        },
        order: [timestamp],
        limit: 10,
        offset: 0,
    }).then(function (result) {
        res.render('dashboard',{
            loggedIn: req.isAuthenticated(),
            user: req.user,
            spec_user: spec_user,
            role_err: req.flash('role_err'),
            readings: null,
            patient : patient,
            assessment: result
        });
    });

    res.render('dashboard',{
        loggedIn: req.isAuthenticated(),
        user: req.user,
        spec_user: spec_user,
        role_err: req.flash('role_err'),
        readings: result
    })
});

router.get('/patient/:id/assessment/:assess_id',ensureAuthenticated,HasRole("D"),VerifyAccess(req.user.id,req.query.id),async(req,res)=>{
    const spec_user = await Doctor.findByPk(req.user.id)

    Assessment.findOne({
        where: {
            id: req.params.assess_id
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

router.get('/patient/:id/assessment/delete',ensureAuthenticated,HasRole("D"),async(req,res)=>{
    const spec_user = await Doctor.findByPk(req.user.id)

    await Assessment.destroy({
        where: {
            id: req.params.assess_id
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
