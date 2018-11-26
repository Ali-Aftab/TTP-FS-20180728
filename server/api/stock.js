const router = require("express").Router();
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    res.json({ hi: "hi" });
  } catch (err) {
    next(err);
  }
});
