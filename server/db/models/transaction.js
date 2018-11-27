const Sequelize = require("sequelize");
const db = require("../db");

const Transaction = db.define("transaction", {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.FLOAT
  },
  amount: {
    type: Sequelize.FLOAT
  },
  date: {
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false
  },
  exchange: {
    type: Sequelize.ENUM("buy", "sell")
  }
});
module.exports = Transaction;
