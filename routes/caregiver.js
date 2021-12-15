const express = require('express');
const router = express.Router();
var Caregiver = require('../models').Caregiver;
var Patient = require('../models').Patient;
const { body,check, validationResult } = require('express-validator');
const {ensureAuthenticated,HasRole} = require("./auth")
const moment = require("moment")
const { Op } = require("sequelize")



router.get('/patient',ensureAuthenticated,HasRole("C"),async(req,res)=>{
    const spec_user = await Caregiver.findOne({
        where : {
            user_id: req.user.id
        }
    });


    Patient.findByPk(spec_user.patient_id).then(patient => {
        res.render('dashboard',{
            loggedIn: req.isAuthenticated(),
            user: req.user,
            spec_user: spec_user,
            cg_patient: patient
        });
    })    
});

router.get('/patient/assessment/',ensureAuthenticated,HasRole("C"),async(req,res)=>{
    const spec_user = await Caregiver.findOne({
        where : {
            user_id: req.user.id
        }
    });


    Assessment.findAndCountAll({
        where: {
            patient_id: spec_user.patient_id
        },
        order: [timestamp],
        limit: 10,
        offset: 0,
    }).then(function (result) {
        res.render('dashboard',{
            loggedIn: req.isAuthenticated(),
            user: req.user,
            spec_user: spec_user,
            assessment: result
        });
    });
});

router.get('/patient/:id/analytics',ensureAuthenticated,HasRole("C"),async(req,res)=>{

    const spec_user = await Caregiver.findOne({
        where : {
            user_id: req.user.id
        }
    });



    SensorUserData.findAndCountAll({
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
            readings: result
        });
    });  
});


router.post('/patient/:id/analytics',[
    // validate input
    check('start_date').not().isEmpty(),
    check('end_date').not().isEmpty(),
    ],
	ensureAuthenticated,
	HasRole("C"),
	async(req,res)=>{

    const spec_user = await Caregiver.findOne({
        where : {
            user_id: req.user.id
        }
    });


    SensorUserData.findAndCountAll({
        where: {
            patient_id: req.params.id,
            timestamp: {
                [Op.gte] : start_date.toDate(),
                [Op.lt] : end_date.toDate()
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
            role_err: req.flash('role_err'),
            readings: result
        });
    });  
});

module.exports = router
