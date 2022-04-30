const {MongoClient} = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();

let _db;
uri = 'mongodb+srv://SierraP:zecc4YKwbelRUwEr@cse341.19dk1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(uri)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
  
};

module.exports = {
  initDb,
  getDb,
};


