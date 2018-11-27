const router = require("express").Router();
const { User, Stock } = require("../db/models");
const request = require("request");
const urlIEX = "https://api.iextrading.com/1.0";

router.post("/get", async (req, res, next) => {
  try {
    console.log(req.body);
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
          console.log(difference);
          const update = await User.update(
            { cash: difference },
            {
              where: {
                id: user.id
              }
            }
          );
        }
        res.json({ price: body });

        // console.log("response", response);
        // console.log("body", body);
      }
    });
    // res.json({ hi: "hi" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
