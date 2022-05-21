const express = require('express');
const router = express.Router();


router.use('/cats', require('./cats'));

module.exports = router;