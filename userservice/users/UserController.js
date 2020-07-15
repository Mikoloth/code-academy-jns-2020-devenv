const { addUser, getUsers, removeUser } = require("./UserRepository");
const bcrypt = require("bcryptjs");

const createUser = (req, res) => {
  const { role } = req.signedCookies.loginStatus || {};
  if (role === "ADMIN") {
    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password);
    addUser({ ...newUser, password: hash }, (addedUser) => {
      const { password, ...safeUser } = addedUser;
      res.json(safeUser);
    });
  } else {
    res.status(401).end("Unauthorized!!!");
  }
};

const readUsers = (req, res) => {
  getUsers((users) =>
    res.json(
      users.map((user) => {
        const { password, ...safeUser } = user;
        return safeUser;
      })
    )
  );
};

const deleteUser = (req, res) => {
  const userIdToRemove = req.params.userId;

  const { userId, role } = req.signedCookies.loginStatus || {};
  if ((role === "ADMIN", userId !== userIdToRemove)) {
    removeUser(userIdToRemove, () => res.end());
  } else {
    res.status(401).end("Unauthorized!!!");
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  getUsers(
    (users) => {
      if (users.length !== 1) {
        console.error("User not found", email);
        res.status(401).send("Username or password does not match!");
      } else {
        const user = users[0];
        if (bcrypt.compareSync(password, user.password)) {
          res.cookie(
            "loginStatus",
            { userId: user._id, role: "ADMIN" },
            { signed: true, httpOnly: true }
          );
          res.end();
        } else {
          res.status(401).send("Username or password does not match!");
        }
      }
    },
    { email } // Sama kuin {email: email}
  );
};

module.exports = {
  createUser,
  readUsers,
  deleteUser,
  loginUser,
};
