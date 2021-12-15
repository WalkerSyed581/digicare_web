const express = require('express');
const router = express.Router();
var Caregiver = require('../models').Caregiver;
var Patient = require('../models').Patient;
const { body,check, validationResult } = require('express-validator');
const ensureAuthenticated = require("./auth")
const moment = require("moment")
const { Op } = require("sequelize")



router.get('/patient',async(req,res)=>{
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

module.exports = router
