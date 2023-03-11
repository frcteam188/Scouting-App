const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { scoutService } = require("../services");

const submitMatch = catchAsync(async (req, res) => {
  const matchData = await scoutService.submitMatch(req.body);
  res.status(httpStatus.CREATED).send(matchData);
});

module.exports = {
  submitMatch,
};
