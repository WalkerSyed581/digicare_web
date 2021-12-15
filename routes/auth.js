const DoctorPatient = require('../models').DoctorPatient;

// Access Control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("login success");
      return next();
    } else {
      console.log("login fail");
        res.redirect('/login');
    }
}

function HasRole(role) {
  return function(req, res, next) {
    if (role !== req.user.role){
      req.flash("role_err","No Authorization for access")
      res.redirect('/')
    }
    else next();
  }
}

function VerifyAccess(doctor_id,patient_id) {
  DoctorPatient.findOne({
    where: {
        patient_id: patient_id,
        doctor_id: doctor_id
    }
  }).then(result => {
    return result
  })
}



module.exports = {ensureAuthenticated,HasRole,VerifyAccess};
