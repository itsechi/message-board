var express = require("express");
var router = express.Router();
const message_controller = require('../controllers/messageController');

// GET request for home page
router.get("/", message_controller.message_list);

// GET request for creating a new message
router.get("/new", message_controller.message_form_get);

// POST request for creating a new message
router.post("/new", message_controller.message_form_post);

module.exports = router;
