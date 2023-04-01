const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { strategyService } = require("../services");

const getMatchSummary = catchAsync(async (req, res) => {
  const matchSummary = await strategyService.getMatchSummary(
    req.params.matchNum
  );
  if (!matchSummary) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "There is currently no matches that were played"
    );
  }
  const flatList = matchSummary.reduce((acc, curr) => acc.concat(curr), []);
  res.send(flatList);
});

const getTeamSummary = catchAsync(async (req, res) => {
  const teamSummary = await strategyService.getTeamSummary(req.params.teamNum);
  if (Array.isArray(teamSummary) && teamSummary.length === 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "This team has not played any matches yet"
    );
  }

  res.send(teamSummary);
});

const getTeamDataForMatch = catchAsync(async (req, res) => {
  const teamMatchSummary = await strategyService.getTeamDataForMatch(
    req.params.teamNum,
    req.params.matchNum
  );
  if (Array.isArray(teamMatchSummary) && teamMatchSummary.length === 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "This team has not played this match yet"
    );
  }

  res.send(teamMatchSummary);
});

module.exports = {
  getMatchSummary,
  getTeamSummary,
  getTeamDataForMatch,
};
