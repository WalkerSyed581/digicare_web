const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env'})

const app = express()
let admin = require('./routes/admin');
let doctor = require('./routes/doctor');
let caregiver = require('./routes/caregiver');
let patient = require('./routes/patient');

app.use(express.static(path.join(__dirname, 'resources')));

app.set('views', path.join(__dirname, 'views'));

// Handlebars
app.engine(
    '.hbs',
    exphbs({
      helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select,
      },
      defaultLayout: 'main',
      extname: '.hbs',
    })
  )
  app.set('view engine', '.hbs')
  

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


require('./middleware/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/',require('./routes/index'))
app.use('/admin', admin);
app.use('/patient', patient);
app.use('/caregiver', caregiver);
app.use('/doctor', doctor);
  

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


const PORT = process.env.PORT || 3000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))