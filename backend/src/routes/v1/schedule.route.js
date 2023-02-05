const express = require('express');
const scheduleController = require('../../controllers/schedule.controller');

const router = express.Router();

router.post('/insert-match', scheduleController.insertMatch);
router.get('/matchNumber/:matchNum', scheduleController.getMatch);

module.exports = router;
