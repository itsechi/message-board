const Message = require("../models/message");
const asyncHandler = require("express-async-handler");

// display all messages
exports.message_list = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find().sort({ added: -1 }).exec();
  res.render("index", {
    title: "Mini Messageboard",
    messages: allMessages,
  });
});

// display message form on GET
exports.message_form_get = (req, res, next) => {
  res.render("form", { title: "Add a message - Mini Messageboard" });
};

// handle message form on POST
exports.message_form_post = asyncHandler(async (req, res, next) => {
  const message = new Message({
    user: req.body.user,
    text: req.body.text,
    added: new Date().toLocaleString(),
  });
  await message.save();
  res.redirect("/");
});
