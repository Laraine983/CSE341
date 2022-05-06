const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


//get one contact
const oneContact = async (req, res) => {
  const contactID = new ObjectId(req.params.id);
  const getResult = await mongodb.getDb().db().collection('contacts').find({ _id: contactID });
  getResult.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

//get all contacts
const allContacts = async (req, res) => {
  const getResult = await mongodb.getDb().db().collection('contacts').find();
  getResult.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// insert contact
const insertContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
};

//update contact
const updateContact = async (req, res) => {
  const contactID = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const reply = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: contactID }, contact);
  console.log(reply);

};

//delete contact
const deleteContact = async (req, res) => {
  const contactID = new ObjectId(req.params.id);
  const reply = await mongodb.getDb().db().collection('contacts').remove({ _id: contactID }, true);
  console.log(reply);
};

module.exports = {oneContact, allContacts, insertContact, updateContact, deleteContact};