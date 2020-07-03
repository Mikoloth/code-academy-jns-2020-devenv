const { MongoClient, ObjectId } = require("mongodb");
const mongoDbUrl = "mongodb://root:example@mongo:27017/";

const getFruits = (callback, query = {}) => {
  MongoClient.connect(mongoDbUrl, (err, dbconn) => {
    if (err) throw err;
    const dbo = dbconn.db("test");
    const collection = dbo.collection("fruits");
    collection.find(query).toArray((err, result) => {
      if (err) throw err;
      callback(result);
      dbconn.close();
    });
  });
};

const addFruit = (newFruit, callback) => {
  MongoClient.connect(mongoDbUrl, (err, dbconn) => {
    if (err) throw err;
    const dbo = dbconn.db("test");
    const collection = dbo.collection("fruits");
    collection.insertOne(newFruit, (err, dbRes) => {
      if (err) throw err;
      callback(dbRes.ops[0]);
      dbconn.close();
    });
  });
};

module.exports = {
  getFruits,
  addFruit,
};
