const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cors = require('cors');
const { signupValidation, loginValidation } = require('./validation.js');


const port = process.env.PORT || 3000;
const app = express();
 
  app.use(cors())
  app.use(bodyParser.json())
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  app.use('/', require('./routes'));
  app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((err, req, res, next) => {
  
   err.statusCode = err.statusCode || 500;
   err.message = err.message || "Internal Server Error";
   res.status(err.statusCode).json({
     message: err.message,
   });
});
 
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
 
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Wk 5 API',
    description: 'Cats API'
  },
  host: 'localhost:3000',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/', function(req, res) {
  res.render('pages/auth');
});

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '864164138381-flsdvm2amnl355n8t0e2n1tdchusikbo.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success');
  });