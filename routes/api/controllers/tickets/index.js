const express = require("express");
const ticketController = require("./ticket.controller");
const router = express.Router();
const { authenticate, authorize } = require("../../../../middlewares/auth/index");

router.post("/tickets", authenticate, authorize(['client']), ticketController.createTicket);
router.post("/tickets/cancel", authenticate, ticketController.cancelTicket);

module.exports = router;