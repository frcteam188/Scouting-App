const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { scheduleService } = require('../services');

const insertMatch = catchAsync(async (req, res) => {
  const match = await scheduleService.createMatch(req.body);
  res.status(httpStatus.CREATED).send(match);
});

module.exports = { insertMatch };
