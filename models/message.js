const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: String, required: true, minLength: 1, maxLength: 40 },
  text: { type: String, required: true, minLength: 1, maxLength: 500 },
  added: { type: String },
});

module.exports = mongoose.model("Message", MessageSchema);
