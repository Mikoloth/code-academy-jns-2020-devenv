const express = require("express");
const app = express();
const port = 3000;

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

app.get("/users", (req, res) => res.json(fakeUsers));
app.post("/users", (req, res) => {
    const nextId = fakeUsers[fakeUsers.length - 1].id + 1;
    const newUser = { ...req.body, id: nextId };
    fakeUsers.push(newUser);
    res.json(newUser);
});
app.delete("/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const index = fakeUsers.findIndex((user) => user.id === userId);
    if (index >= 0) {
        fakeUsers.splice(index, 1);
    }
    res.end();
});

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);