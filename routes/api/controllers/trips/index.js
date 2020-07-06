const express = require("express");
const tripController = require("./trip.controller");
const router = express.Router();
const { authenticate, authorize } = require("../../../../middlewares/auth");

router.get("/trips", tripController.getTrips);
router.get("/trips/:id", tripController.getTripById);
router.post("/trips", authenticate, authorize(["admin"]), tripController.postTrip);
router.patch("/trips/:id", authenticate, authorize(["admin"]), tripController.patchTripById);
router.delete("/trips/:id", authenticate, authorize(["admin"]), tripController.deleteTripById);

module.exports = router;