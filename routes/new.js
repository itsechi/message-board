var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("form", { title: "Add a message - Mini Messageboard" });
});

module.exports = router;
