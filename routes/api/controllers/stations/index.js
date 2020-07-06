const express = require("express");
const stationController = require("./station.controller");
const router = express.Router();
const { authenticate, authorize } = require("../../../../middlewares/auth");

router.get("/stations", stationController.getStations);
router.get("/stations/:id", stationController.getStationById);
router.post("/stations", authenticate, authorize(["admin"]), stationController.postStations);
router.put("/stations/:id", authenticate, authorize(["admin"]), stationController.putStationById);
router.patch("/stations/:id", authenticate, authorize(["admin"]), stationController.patchStationById);
router.delete("/stations/:id", authenticate, authorize(["admin"]), stationController.deleteStationById);

module.exports = router;