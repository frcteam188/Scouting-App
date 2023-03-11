const express = require("express");
const scoutController = require("../../controllers/scout.controller");

const router = express.Router();

router.post("/submit-match", scoutController.submitMatch);

module.exports = router;
