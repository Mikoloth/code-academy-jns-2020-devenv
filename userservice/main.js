const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 3000;
const mongoDbUrl = "mongodb://root:example@mongo:27017/";

app.use(express.json());

const fakeUsers = [
    {
        id: 1,
        name: "Admin",
        email: "admin@example.com",
        password: "admin",
    },
    {
        name: "Ville",
        email: "ville@example.com",
        password: "ville",
        id: 2,
    },
];

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

app.get("/fruits", (req, res) => {
    MongoClient.connect(mongoDbUrl, (err, dbconn) => {
        if (err) throw err;
        const dbo = dbconn.db("test");
        const collection = dbo.collection("fruits");
        collection.find({}).toArray((err, result) => {
            if (err) throw err;
            res.json(result);
            dbconn.close();
        });
    });
});

app.post("/fruits", (req, res) => {
    const newFruit = req.body;
    MongoClient.connect(mongoDbUrl, (err, dbconn) => {
        if (err) throw err;
        const dbo = dbconn.db("test");
        const collection = dbo.collection("fruits");
        collection.insertOne(newFruit, (err, dbRes) => {
            if (err) throw err;
            res.json(dbRes.ops[0]);
            dbconn.close();
        });
    });
});

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

/*app.delete("/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const index = fakeUsers.findIndex((user) => user.id === userId);
    if (index >= 0) {
        fakeUsers.splice(index, 1);
    }
    res.end();
});*/

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

app.delete("/users/:userId", (req, res) => {
    MongoClient.connect(mongoDbUrl, (err, dbconn) => {
        if (err) throw err;
        const dbo = dbconn.db("userservice");
        const collection = dbo.collection("users");
        collection.deleteOne({ _id: ObjectId(req.params.userId) }, (err, dbRes) => {
            if (err) throw err;
            res.end();
            dbconn.close();
        });
    });
});

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);