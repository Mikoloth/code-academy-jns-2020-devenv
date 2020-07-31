const { MongoClient } = require("mongodb");
const { MONGO_HOST, MONGO_PORT = 27017, MONGO_USER, MONGO_PASS } = process.env;
const mongoDbUrl = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/`;

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
