const express = require('express');
const router = express.Router();
const { body,check, validationResult } = require('express-validator');
const ensureAuthenticated = require("./auth")
const moment = require("moment")
const { Op } = require("sequelize")

router.get('admin/profile',async (req,res)=>{
  console.log(req.user)
  var authUser = await User.findOne({where:
  {
    id: req.user.id
  }})
  if(req.isAuthenticated()) {
    res.render('pages/MyAccount',{
      user: authUser,
      testVar: "hello!",
      loggedIn: true
    })
  }
});

router.post('admin/profile',[
  check('fullName','Full name must be 3+ characters long').not().isEmpty().isLength({ min: 3 }),
  check('emailAddress','Please enter a valid email')
    .not().isEmpty().withMessage('Email cannot be empty')
    .isEmail().withMessage('Email is not valid')
    .normalizeEmail().custom((value, { req })  => {
      return User.findOne({where:{
        email:value,
        id: {
          [Op.ne] : req.user.id
        }
      }}).then(user => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),
  check('PhoneNumber','Please enter a valid phone')
    .not().isEmpty().withMessage('Phone number cannot be empty')
    .isMobilePhone().withMessage('Phone number not valid'),
  check('passwordFirst')
    .optional(),
  check('passwordConfirm').optional().custom((value, { req }) => {
    if (value !== req.body.passwordFirst) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  check('dob','Please enter a valid Date of Birth').optional().isDate()
],async (req,res)=>{
  
  const errors = validationResult(req)
    if(!errors.isEmpty()) {
        alert = errors.errors;
        console.log(alert)
        res.render('pages/MyAccount', {
            alert,
            loggedIn: true,
            user: req.user
        })
    } else {
      const salt = await bcrypt.genSalt(10);
      const dob = moment(req.body.dob);
      const update_user = await User.update({
        name: req.body.fullName,
        email: req.body.emailAddress,
        phone_no: req.body.PhoneNumber,
        dob : dob ? dob.format() : new Date('10 Jul 1999'), //replace with req.user.dob
      },{
        where: {
          id: req.user.id
        }
      });
      if(req.body.passwordFirst != '' && req.body.passwordConfirm != ''){
        const update_user = await User.update({
          password: await bcrypt.hash(req.body.passwordFirst, salt),
        },{
          where: {
            id: req.user.id
          }
          }
        );
      }
      console.log('profile updated');
      req.session.message = 'Edited Successfully';
      res.redirect('/users/profile',);
    }
});


// Register Form
router.get('admin/register', async (req, res) => {
    res.render('pages/Register', {
      loggedIn: false
    })
});

router.post('admin/register', [
  check('fullName','This username must me 3+ characters long').not().isEmpty().isLength({ min: 3 }),
  check('emailAddress','Please enter a validate email')
    .not().isEmpty().withMessage('Email cannot be empty')
    .isEmail().withMessage('Email is not valid')
    .normalizeEmail().custom(value => {
      return User.findOne({where:{email:value}}).then(user => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),
  check('PhoneNumber','Please enter a validate email')
    .not().isEmpty().withMessage('Phone number cannot be empty')
    .isMobilePhone().withMessage('Phone number not valid'),
  check('passwordFirst')
    .not().isEmpty().withMessage('Email cannot be empty')
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0})
    .withMessage('Password not strong enough: Should be of length 8 with 1 Lowercase,1 Uppercase and 1 Symbol'),
  check('passwordConfirm').not().isEmpty().withMessage('Confirm Password cannot be empty').custom((value, { req }) => {
    if (value !== req.body.passwordFirst) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  check('dob','Please enter a valid Date of Birth').optional().isDate()
],
  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        alert = errors.errors;
        console.log(alert);
        res.render('pages/Register', {
            alert,
            loggedIn: false
        })
    } else {
      const gender = null;
      const salt = await bcrypt.genSalt(10);
      const dob = moment(req.body.dob);
      console.log(req.body);
      const newUser = await User.create({
        name: req.body.fullName,
        email: req.body.emailAddress,
        password: await bcrypt.hash(req.body.passwordFirst, salt),
        phone_no: req.body.PhoneNumber,
        dob : dob.format(),
        user_rating: 0.0,
      });
      newUser.save();
      req.session.message = 'Registered Successfully, please login';
      res.redirect('/users/login');
  }
});



router.get('/admin/sensor',async(req,res)=>{

}); 

router.get('/admin/sensor/:id',async(req,res)=>{

}); 

router.get('/admin/sensor/:id/readings',async(req,res)=>{

}); 
