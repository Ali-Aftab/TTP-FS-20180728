const router = require("express").Router();
module.exports = router;

router.post("/get", (req, res, next) => {
  try {
    console.log(req.body);
    res.json({ hi: "hihihi" });
  } catch (err) {
    next(err);
  }
});
