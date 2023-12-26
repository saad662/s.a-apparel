const express = require("express");
const { subscribeUser } = require("../controllers/subscriptionController");

const router = express.Router();

router.route("/subscribe").post(subscribeUser);

module.exports = router;