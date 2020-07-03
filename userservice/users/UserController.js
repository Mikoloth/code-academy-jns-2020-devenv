const { getUsers, addUser, delUser } = require("./UserRepository");

const readUsers = (req, res) => {
    getUsers((users) => res.json(users));
};

const createUser = (req, res) => {
    const newUser = req.body;
    addUser(newUser, (addedUser) => res.json(addedUser));
};

const deleteUser = (req, res) => {
    const userId = req.params.userId;
    delUser(userId, (delUser) => res.end());
};

module.exports = {
    readUsers,
    createUser,
    deleteUser,
};