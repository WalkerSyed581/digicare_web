const express = require('express');
const router = express.Router();
const { body,check, validationResult } = require('express-validator');
const ensureAuthenticated = require("./auth")
const moment = require("moment")
const { Op } = require("sequelize")

router.get('/doctor/patient',async(req,res)=>{

});

router.get('/doctor/patient/:id',async(req,res)=>{

});

router.get('/doctor/patient/:id/reading',async(req,res)=>{

});

router.get('/doctor/patient/:id/reading',async(req,res)=>{

});