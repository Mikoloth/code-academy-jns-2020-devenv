const { MongoClient, ObjectId } = require("mongodb");
const mongoDbUrl = "mongodb://root:example@mongo:27017/";

const getUsers = (callback, query = {}) => {
    MongoClient.connect(mongoDbUrl, (err, dbconn) => {
        if (err) throw err;
        const dbo = dbconn.db("userservice");
        const collection = dbo.collection("users");
        collection.find(query).toArray((err, result) => {
            if (err) throw err;
            callback(result);
            dbconn.close();
        });
    });
};

const addUser = (newUser, callback) => {
    MongoClient.connect(mongoDbUrl, (err, dbconn) => {
        if (err) throw err;
        const dbo = dbconn.db("userservice");
        const collection = dbo.collection("users");
        collection.insertOne(newUser, (err, dbRes) => {
            if (err) throw err;
            callback(dbRes.ops[0]);
            dbconn.close();
        });
    });
};

const delUser = (userId, callback) => {
    MongoClient.connect(mongoDbUrl, (err, dbconn) => {
        if (err) throw err;
        const dbo = dbconn.db("userservice");
        const collection = dbo.collection("users");

        const deleteQuery = { _id: ObjectId(userId) };
        console.log({ deleteQuery });
        collection.deleteOne(deleteQuery, (err, dbRes) => {
            if (err) throw err;
            console.log({ dbRes });
            callback();
            dbconn.close();
        });
    });
};

module.exports = {
    getUsers,
    addUser,
    delUser,
};