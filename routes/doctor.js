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

router.get('/patient/:id/reading',ensureAuthenticated,HasRole("D"),async(req,res)=>{

    if(!VerifyAccess(req.user.id,req.params.id)){
        req.flash("role_err","No Authorization for access")
        res.redirect('/')
    } else {
        next();
    }

    const spec_user = await Doctor.findByPk({
        where: {
            user_id: req.user.id
        }
    })

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


router.get('/patient/:id/assessment/add',ensureAuthenticated,HasRole("D"),async(req,res)=>{
     if(!VerifyAccess(req.user.id,req.params.id)){
        req.flash("role_err","No Authorization for access")
        res.redirect('/')
    } else {
        next();
    }

    const spec_user = await Doctor.findByPk({
        where: {
            user_id: req.user.id
        }
    })

    
    res.render('dashboard',{
        loggedIn: req.isAuthenticated(),
        user: req.user,
        spec_user: spec_user,
        role_err: req.flash('role_err'),
        readings: result
    });
});

router.get('/patient/:id/assessment/',ensureAuthenticated,HasRole("D"),async(req,res)=>{
    if(!VerifyAccess(req.user.id,req.params.id)){
        req.flash("role_err","No Authorization for access")
        res.redirect('/')
    } else {
        next();
    }
    const spec_user = await Doctor.findByPk({
        where: {
            user_id: req.user.id
        }
    })



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

router.get('/patient/:id/assessment/:assess_id',ensureAuthenticated,HasRole("D"),async(req,res)=>{
    if(!VerifyAccess(req.user.id,req.params.id)){
        req.flash("role_err","No Authorization for access")
        res.redirect('/')
    } else {
        next();
    }

    const spec_user = await Doctor.findByPk({
        where: {
            user_id: req.user.id
        }
    })

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
    if(!VerifyAccess(req.user.id,req.params.id)){
        req.flash("role_err","No Authorization for access")
        res.redirect('/')
    } else {
        next();
    }

    const spec_user = await Doctor.findByPk({
        where: {
            user_id: req.user.id
        }
    })

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

router.get('/patient/:id/analytics',ensureAuthenticated,HasRole("D"),async(req,res)=>{
    if(!VerifyAccess(req.user.id,req.params.id)){
        req.flash("role_err","No Authorization for access")
        res.redirect('/')
    } else {
        next();
    }

    const spec_user = await Doctor.findOne({
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
    ],ensureAuthenticated,HasRole("D"),async(req,res)=>{
    if(!VerifyAccess(req.user.id,req.params.id)){
        req.flash("role_err","No Authorization for access")
        res.redirect('/')
    } else {
        next();
    }

    const spec_user = await Doctor.findOne({
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
