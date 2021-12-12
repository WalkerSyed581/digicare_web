const express = require('express');
const router = express.Router();
const { body,check, validationResult } = require('express-validator');
const ensureAuthenticated = require("./auth")
const moment = require("moment")
const { Op } = require("sequelize")

router.get('/caregiver/patient',async(req,res)=>{

});

router.get('/caregiver/patient/:id',async(req,res)=>{

});
