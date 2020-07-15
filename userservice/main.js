const express = require("express");
const cookieParser = require("cookie-parser");

const {
  readFruits,
  readRedFruits,
  createFruit,
} = require("./fruits/FruitController");

const {
  createUser,
  readUsers,
  deleteUser,
  loginUser,
} = require("./users/UserController");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser("HYVIN_PITKÄ_JA_HANKALASTI_ARVATTAVA_AVAIN"));

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

app.post("/users", createUser);
app.get("/users", readUsers);
app.delete("/users/:userId", deleteUser);
app.post("/login", loginUser);

app.get("/getSession", (req, res) => res.send(req.signedCookies.loginStatus));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
