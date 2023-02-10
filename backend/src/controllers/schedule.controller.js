const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { scheduleService } = require('../services');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

const insertMatch = catchAsync(async (req, res) => {
  const match = await scheduleService.createMatch(req.body);
  res.status(httpStatus.CREATED).send(match);
});

const getMatch = catchAsync(async (req, res) => {
  const match = await scheduleService.getMatchByNumber(req.params.matchNum);
  if (!match) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Match not found');
  }
  res.send(match);
});

const getAllMatches = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['eventID', 'matchNumber']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await scheduleService.queryMatches(filter, options);
  res.send(result);
});

module.exports = { insertMatch, getMatch, getAllMatches };
