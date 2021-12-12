const express = require('express');
const router = express.Router();
const { body,check, validationResult } = require('express-validator');
const ensureAuthenticated = require("./auth")
const moment = require("moment")
const { Op } = require("sequelize")

router.get('/patient/readings',async(req,res)=>{

}); 

router.get('/patient/readings/:id',async(req,res)=>{

}); 