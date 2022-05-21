const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
//body parser?

//get one cat
const onecat = async (req, res) => {
  const catID = new ObjectId(req.params.id);
  const getResult = await mongodb.getDb().db().collection('cats').find({ _id: catID });
  getResult.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

//get all cats
const allcats = async (req, res) => {
  const getResult = await mongodb.getDb().db().collection('cats').find();
  getResult.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// insert cat
const insertcat = async (req, res) => {
  const catInfo = {
    breed: req.body.breed,
    color: req.body.color,
    weight: req.body.weight
    
  };
};

//update cat
const updatecat = async (req, res) => {
  const catID = new ObjectId(req.params.id);
  const catInfo = {
    breed: req.body.breed,
    color: req.body.color,
    weight: req.body.weight
    
  };
  const reply = await mongodb
    .getDb()
    .db()
    .collection('cats')
    .replaceOne({ _id: catID }, catInfo);
  console.log(reply);

};


module.exports = {onecat, allcats, insertcat, updatecat};