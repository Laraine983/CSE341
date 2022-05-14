
const express = require('express')
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cors = require('cors');
 
const port = process.env.PORT || 3000;
const app = express();
 
  app.use(cors())
  app.use(bodyParser.json())
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  app.use('/', require('./routes'));
 
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
    title: 'Wk 4 API',
    description: 'Contacts API'
  },
  host: 'localhost:3000',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['nodeapp/routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);
