const express = require('express')
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cors = require('cors');
const { signupValidation, loginValidation } = require('./validation.js');
const { auth } = require('express-openid-connect');

 
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
app.use(
  auth({
    issuerBaseURL: 'https://YOUR_DOMAIN',
    baseURL: 'https://YOUR_APPLICATION_ROOT_URL',
    clientID: 'YOUR_CLIENT_ID',
    secret: 'LONG_RANDOM_STRING',
    idpLogout: true,
  })
);

app.post('/register', signupValidation, (req, res, next) => {
  // your registration code
});


app.post('/login', loginValidation, (req, res, next) => {
  // your login code
});

// Handling Errors
app.use((err, req, res, next) => {
   // console.log(err);
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
