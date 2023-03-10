const express = require("express");
const scheduleController = require("../../controllers/schedule.controller");

const router = express.Router();

router.post("/insert-match", scheduleController.insertMatch);
router.get("/:stationID/:matchNum", scheduleController.getMatch);
router.get("/allMatches", scheduleController.getAllMatches);

module.exports = router;
