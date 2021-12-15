const LocalStrategy = require('passport-local').Strategy
var User = require('../models').User;
var Patient = require('../models').Patient;
var Doctor = require('../models').Doctor;
var Caregiver = require('../models').Caregiver;
const bcrypt = require("bcrypt")
const { Op } = require("sequelize")

module.exports = function(passport){
    passport.use(new LocalStrategy(function(username,password,role,done){
        console.log("Running passport auth function!");
        User.findOne({
            where: {
                email: {
                    [Op.eq]: username
                }
            }
        }).then(user => {
            if (!user) {
                console.log('No user found!');
                return done(null, false, { message: 'No user found' });
            }
            // Match Password
            console.log('User found!');
            bcrypt.compare(password,user.dataValues.password).then((result)=>{
                if (result) {
                    console.log('Correct pw!');
                    if(role == "P"){
                        Patient.findOne({
                            where: {
                                user_id : user.id
                            }
                        }).then(patient => {
                            if (!patient) {
                                console.log('No patient found!');
                                return done(null, false, { message: 'No patient found' });
                            }
                            user.spec_id = patient.id
                            user.role = "P"
                        }) 
                    } else if(role == "D"){
                        Doctor.findOne({
                            where: {
                                user_id : user.id
                            }
                        }).then(doctor => {
                            if (!doctor) {
                                console.log('No doctor found!');
                                return done(null, false, { message: 'No doctor found' });
                            }

                            user.role = "D"
                            user.spec_id = doctor.id

                        }) 
                    } else if(role == "C"){
                        Caregiver.findOne({
                            where: {
                                user_id : user.id
                            }
                        }).then(caregiver => {
                            if (!caregiver) {
                                console.log('No caregiver found!');
                                return done(null, false, { message: 'No caregiver found' });
                            }

                            user.role = "C"
                            user.spec_id = caregiver.id
                            
                        }) 
                    } else if(req.body.role == "A"){
                        console.log('No admin found!');
                        return done(null, false, { message: 'No admin found' });
                    } 
                    return done(null, user);
                } else {
                    console.log('Wrong pw!');
                    return done(null, false, { message: 'Wrong password' });
                }
            }).catch((err)=>console.error(err))
            
        }).catch(err => {
            if(err) throw err;
        })
    }));

    passport.serializeUser(function(user,done){
        done(null,user.id)
    })

    passport.deserializeUser(function(id, done) {
        User.findByPk(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            } 
        });
    });
}