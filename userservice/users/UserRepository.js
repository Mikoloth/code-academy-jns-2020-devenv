const { ObjectId } = require("mongodb");
const { getCollection } = require("../db");

const addUser = (newUser, callback) => {
  const collection = getCollection("userservice", "users");
  collection.insertOne(newUser, (err, dbRes) => {
    if (err) throw err;
    callback(dbRes.ops[0]);
  });
};
const getUsers = (callback) => {
  const collection = getCollection("userservice", "users");
  collection.find({}).toArray((err, result) => {
    if (err) throw err;
    callback(result);
  });
};
const removeUser = (userId, callback) => {
  const collection = getCollection("userservice", "users");

  const deleteQuery = { _id: ObjectId(userId) };
  collection.deleteOne(deleteQuery, (err, dbRes) => {
    if (err) throw err;
    callback();
  });
};

module.exports = {
  addUser,
  getUsers,
  removeUser,
};
