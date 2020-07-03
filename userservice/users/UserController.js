const { addUser, getUsers, removeUser } = require("./UserRepository");

const createUser = (req, res) => {
  const newUser = req.body;
  addUser(newUser, (addedUser) => res.json(addedUser));
};

const readUsers = (req, res) => {
  getUsers((users) => res.json(users));
};

const deleteUser = (req, res) => {
  const userId = req.params.userId;
  removeUser(userId, () => res.end());
};

module.exports = {
  createUser,
  readUsers,
  deleteUser,
};
