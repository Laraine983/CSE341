const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/cats', require('./cats'));

module.exports = router;