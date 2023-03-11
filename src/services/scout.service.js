const httpStatus = require("http-status");
const { MatchData } = require("../models");
const ApiError = require("../utils/ApiError");

const submitMatch = async (matchDataBody) => {
  if (
    await MatchData.matchEntryExists(
      matchDataBody.matchNumber,
      matchDataBody.driverStation
    )
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Entry for this match and driver station exists"
    );
  }
  return MatchData.create(matchDataBody);
};

module.exports = {
  submitMatch,
};
