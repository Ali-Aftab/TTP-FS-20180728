const router = require("express").Router();
const { User, Stock, Transaction } = require("../db/models");
const request = require("request");
const urlIEX = "https://api.iextrading.com/1.0";

router.get("/all/:id", async (req, res, next) => {
  try {
    const allStocks = await Stock.findAll({
      where: {
        userId: req.params.id
      }
    });
    res.json(allStocks);
  } catch (error) {
    next(error);
  }
});

router.get("/transactions/:id", async (req, res, next) => {
  try {
    const allTransactions = await Transaction.findAll({
      where: {
        userId: req.params.id
      }
    });
    res.json(allTransactions);
  } catch (error) {
    next(error);
  }
});

router.post("/buy", async (req, res, next) => {
  try {
    const oneStock = urlIEX + "/stock/" + req.body.stock + "/price";
    const user = await User.findOne({
      where: {
        id: req.body.id
      }
    });
    request.get(oneStock, async function(error, response, body) {
      if (error) {
        console.log("error", error);
      } else {
        const price = Number(body);
        const amount = req.body.amount;
        const total = price * amount;
        if (total < user.cash) {
          const difference = user.cash - total;
          const update = await User.update(
            { cash: difference },
            {
              where: {
                id: user.id
              }
            }
          );
          const newTransaction = await Transaction.create({
            name: req.body.stock,
            price,
            amount,
            exchange: "buy",
            userId: req.body.id
          });
          const purchasedStock = await Stock.findOne({
            where: { userId: req.body.id, name: req.body.stock }
          });
          if (purchasedStock === null) {
            const newStock = await Stock.create({
              name: req.body.stock,
              price,
              amount,
              userId: req.body.id
            });
          } else {
            const newSum = Number(purchasedStock.amount) + Number(amount);
            const newPrice =
              (Number(purchasedStock.price) * Number(purchasedStock.amount) +
                Number(price) * Number(amount)) /
              (Number(purchasedStock.amount) + Number(amount));
            const updateStock = await Stock.update(
              { amount: newSum, price: newPrice },
              {
                where: {
                  name: req.body.stock,
                  userId: req.body.id
                }
              }
            );
          }
          const userInfo = await User.findOne({
            where: {
              id: user.id
            }
          });
          console.log(userInfo);
          res.json({ price: body, cash: userInfo.cash });
        } else {
          res.json({ message: "You do not have enough funds" });
        }
      }
    });
    // res.json({ hi: "hi" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
