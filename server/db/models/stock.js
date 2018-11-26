const Sequelize = require("sequelize");
const db = require("../db");

const Stock = db.define("stock", {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.FLOAT
  },
  amount: {
    type: Sequelize.FLOAT
  }
});
module.exports = Stock;
