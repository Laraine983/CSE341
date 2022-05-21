
const express = require('express');
const router = express.Router();
const catsController = require('../controllers/cats');

//one cat
router.get('/:id', catsController.onecat);

//all cats
router.get('/', catsController.allcats);

//insert cat
router.post('/', catsController.insertcat);

//update cat
router.put('/:id', catsController.updatecat);

//export modules
module.exports = router;