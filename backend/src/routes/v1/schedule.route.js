const express = require('express');
const scheduleController = require('../../controllers/schedule.controller');

const router = express.Router();

router.post('/insert-match', scheduleController.insertMatch);

module.exports = router;
