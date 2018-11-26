const router = require("express").Router();
const { User, Stock } = require("../db/models");
const request = require("request");
const urlIEX = "https://api.iextrading.com/1.0?";

router.post("/get", (req, res, next) => {
  try {
    console.log(req.body);
    const oneStock =
      urlIEX +
      request.get(urlIEX, function(error, response, body) {
        console.log("error", error);
        // console.log("response", response);
        // console.log("body", body);
      });
    res.json({ hi: "hi" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
