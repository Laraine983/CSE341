
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

//one contact
router.get('/:id', contactsController.oneContact);

//all contacts
router.get('/', contactsController.allContacts);

//insert contact
router.post('/', contactsController.insertContact);

//update contact
router.put('/:id', contactsController.updateContact);

//delete contact
router.delete('/:id', contactsController.deleteContact);

//export modules
module.exports = router;