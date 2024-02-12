const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
exports.message_form_post = [
  body("user", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("text", "Text must not be empty").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const message = new Message({
      user: req.body.user,
      text: req.body.text,
      added: new Date().toLocaleString(),
    });

    // if there are errors render the form with error messages
    if (!errors.isEmpty) {
      res.render("form", {
        title: "Add a message - Mini Messageboard",
        errors: errors.array(),
      });
      return;
    } else {
      await message.save();
      res.redirect("/");
    }
  }),
];
