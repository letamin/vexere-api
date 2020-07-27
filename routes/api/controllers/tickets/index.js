const express = require("express");
const ticketController = require("./ticket.controller");
const router = express.Router();
const { authenticate, authorize } = require("../../../../middlewares/auth/index");

router.post("/tickets", authenticate, authorize(['client']), ticketController.createTicket);

module.exports = router;