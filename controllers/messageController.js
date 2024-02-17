const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// display all messages
exports.message_list = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find().sort({ _id: -1 }).exec();
  res.render("index", {
    title: "Mini Message Board",
    messages: allMessages,
  });
});

// display message form on GET
exports.message_form_get = (req, res, next) => {
  res.render("form", { title: "Add a message - Mini Message Board" });
};

// handle message form on POST
exports.message_form_post = [
  body("user")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name cannot be empty")
    .isLength({ max: 40 })
    .withMessage("Name cannot be longer than 40 characters"),
  body("text")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Text cannot be empty")
    .isLength({ max: 500 })
    .withMessage("Text cannot be longer than 500 characters"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const message = new Message({
      user: req.body.user,
      text: req.body.text,
      added: new Date().toLocaleString(),
    });

    // if there are errors render the form with error messages
    if (!errors.isEmpty()) {
      res.render("form", {
        title: "Add a message - Mini Message Board",
        errors: errors.array(),
      });
      return;
    } else {
      await message.save();
      res.redirect("/");
    }
  }),
];
