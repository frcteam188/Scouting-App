const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const autoDataSchema = mongoose.Schema({
  mobility: {
    type: Boolean,
    required: true,
  },
  startingPosition: {
    type: String,
    required: true,
  },
  preloadGamePeice: {
    type: String,
    required: true,
  },
  autoCubePickup: { type: Number },
  autoCubeHighAttempt: { type: Number },
  autoCubeHighScored: { type: Number },
  autoCubeMedAttempt: { type: Number },
  autoCubeMedScored: { type: Number },
  autoCubeLowAttempt: { type: Number },
  autoCubeLowScored: { type: Number },
  autoConePickup: { type: Number },
  autoConeHighAttempt: { type: Number },
  autoConeHighScored: { type: Number },
  autoConeMedAttempt: { type: Number },
  autoConeMedScored: { type: Number },
  autoConeLowAttempt: { type: Number },
  autoConeLowScored: { type: Number },
  autoDocked: { type: Boolean },
  autoEngaged: { type: Boolean },
});

const teleDataSchema = mongoose.Schema({
  teleCubeFloorPickup: { type: Number }, // {1: Number, 2:Number, 3: Number}
  teleCubeHumanLoad: { type: Number },
  teleCubeHighAttempt: { type: Number },
  teleCubeHighScored: { type: Number },
  teleCubeMedAttempt: { type: Number },
  teleCubeMedScored: { type: Number },
  teleCubeLowAttempt: { type: Number },
  teleCubeLowScored: { type: Number },

  teleConeFloorPickup: { type: Number },
  teleConeHumanLoad: { type: Number },
  teleConeHighAttempt: { type: Number },
  teleConeHighScored: { type: Number },
  teleConeMedAttempt: { type: Number },
  teleConeMedScored: { type: Number },
  teleConeLowAttempt: { type: Number },
  teleConeLowScored: { type: Number },
});
const endGameDataSchema = mongoose.Schema({
  park: { type: Boolean },
  docked: { type: Boolean },
  engaged: { type: Boolean },
  balanceAttempt: { type: Boolean },
  balanceSuccess: { type: Boolean },
  comments: { type: String },
});

// const gameDataSchema = mongoose.Schema({
//   autoData: {
//     type: autoDataSchema,
//     required: true,
//   },
//   teleData: {
//     type: teleDataSchema,
//     required: true,
//   },
//   endGameData: {
//     type: endGameDataSchema,
//     required: true,
//   },
// });

const matchDataSchema = mongoose.Schema({
  teamID: {
    type: String,
    required: true,
  },
  eventID: {
    type: String,
    required: true,
  },
  matchNumber: {
    type: String,
    required: true,
  },
  driverStation: {
    type: String,
    required: true,
  },
  autoData: {
    type: autoDataSchema,
    required: true,
  },
  teleData: {
    type: teleDataSchema,
    required: true,
  },
  endGameData: {
    type: endGameDataSchema,
    required: true,
  },
});

//gameDataSchema.plugin(toJSON);
matchDataSchema.plugin(toJSON);

matchDataSchema.statics.matchEntryExists = async function (
  matchNumber,
  driverStation
) {
  const matchEntry = await this.findOne({ matchNumber, driverStation });
  return !!matchEntry;
};

const MatchData = mongoose.model("MatchData", matchDataSchema);

module.exports = MatchData;

// "teamID" = "frc188",
// "eventID" = "onosh2020",
// "matchNumber" = 1
// "gameData" = game1

// "teamID" = "frc188",
// "eventID" = "onosh2020",
// "matchNumber" = 5
// "gameData" = game2

// "teamID" = "frc188",
// "eventID" = "onosh2020",
// "matchData" = [game1, game2]
