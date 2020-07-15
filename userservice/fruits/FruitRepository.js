const { ObjectId } = require("mongodb");
const { getCollection } = require("../db");

const getFruits = (callback, query = {}) => {
  const collection = getCollection("test", "fruits");
  collection.find(query).toArray((err, result) => {
    if (err) throw err;
    callback(result);
  });
};

const addFruit = (newFruit, callback) => {
  const collection = getCollection("test", "fruits");
  collection.insertOne(newFruit, (err, dbRes) => {
    if (err) throw err;
    callback(dbRes.ops[0]);
  });
};

module.exports = {
  getFruits,
  addFruit,
};
