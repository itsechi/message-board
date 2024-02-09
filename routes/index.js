var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Message = require("../models/message");
require('dotenv').config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URI).catch((err) => console.log(err));

/* GET home page. */
router.get("/", async function (req, res, next) {
  await Message.find().then((data) => {
    res.render("index", { title: "Mini Messageboard", messages: data });
  });
});

router.post("/new", async function (req, res) {
  const message = new Message({ user: req.body.user, text: req.body.text, added: new Date().toLocaleString() });
  await message.save();
  res.redirect("/");
});

module.exports = router;
