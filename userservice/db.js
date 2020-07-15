const { MongoClient } = require("mongodb");
const mongoDbUrl = "mongodb://root:example@mongo:27017/";

const connection = {};

const getCollection = (db, collection) => {
  const dbo = connection.dbconn.db(db);
  return dbo.collection(collection);
};
MongoClient.connect(mongoDbUrl, (err, dbconn) => {
  if (err) throw err;
  connection.dbconn = dbconn;
});

module.exports = { getCollection };
