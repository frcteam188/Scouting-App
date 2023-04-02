const express = require("express");
const strategyController = require("../../controllers/strategy.controller");

const router = express.Router();

router.get("/match/:matchNum", strategyController.getMatchSummary);
router.get("/team/:teamNum", strategyController.getTeamSummary);
router.get("/team/:teamNum/:matchNum", strategyController.getTeamDataForMatch);
router.get("/master-view", strategyController.getAllMatchSummary);

module.exports = router;
