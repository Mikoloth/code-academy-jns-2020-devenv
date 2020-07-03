const { getFruits, addFruit } = require("./FruitRepository");

const readFruits = (req, res) => {
  getFruits((fruits) => res.json(fruits));
};
const readRedFruits = (req, res) => {
  getFruits((fruits) => res.json(fruits), { color: "red" });
};

const createFruit = (req, res) => {
  const newFruit = req.body;
  addFruit(newFruit, (addFruit) => res.json(addFruit));
};

module.exports = {
  readFruits,
  readRedFruits,
  createFruit,
};
