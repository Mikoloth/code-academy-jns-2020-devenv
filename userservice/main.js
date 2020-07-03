const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const {
  readFruits,
  readRedFruits,
  createFruit,
} = require("./fruits/FruitController");

const app = express();
const port = 3000;
const mongoDbUrl = "mongodb://root:example@mongo:27017/";

app.use(express.json());

app.get("/hello", (req, res) => res.send("Hello World!!!"));

const bootTime = new Date();
app.get("/heartbeat", (req, res) => {
  const now = new Date();
  res.send(`
  <div>
    <div>Boot time: ${bootTime.toLocaleString("fi-FI", {
      timeZone: "Europe/Helsinki",
    })}</div>
    <div>Current time: ${now.toLocaleString("fi-FI", {
      timeZone: "Europe/Helsinki",
    })}</div>
    <div>Uptime: ${now - bootTime}ms</div>
  </div>
  `);
});

app.post("/fruits", createFruit);
app.get("/fruits", readFruits);
app.get("/redFruits", readRedFruits);

app.get("/users", (req, res) => {
  MongoClient.connect(mongoDbUrl, (err, dbconn) => {
    if (err) throw err;
    const dbo = dbconn.db("userservice");
    const collection = dbo.collection("users");
    collection.find({}).toArray((err, result) => {
      if (err) throw err;
      res.json(result);
      dbconn.close();
    });
  });
});

app.delete("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  MongoClient.connect(mongoDbUrl, (err, dbconn) => {
    if (err) throw err;
    const dbo = dbconn.db("userservice");
    const collection = dbo.collection("users");

    const deleteQuery = { _id: ObjectId(userId) };
    console.log({ deleteQuery });
    collection.deleteOne(deleteQuery, (err, dbRes) => {
      if (err) throw err;
      console.log({ dbRes });
      res.end();
      dbconn.close();
    });
  });
});
app.post("/users", (req, res) => {
  const newUser = req.body;
  MongoClient.connect(mongoDbUrl, (err, dbconn) => {
    if (err) throw err;
    const dbo = dbconn.db("userservice");
    const collection = dbo.collection("users");
    collection.insertOne(newUser, (err, dbRes) => {
      if (err) throw err;
      res.json(dbRes.ops[0]);
      dbconn.close();
    });
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
