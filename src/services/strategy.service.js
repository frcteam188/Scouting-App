const httpStatus = require("http-status");
const { MatchData, Schedule } = require("../models");
const ApiError = require("../utils/ApiError");

const getMatchSummary = async (matchNumber) => {
  const matchExists = await Schedule.scheduleEntryExists(matchNumber);
  if (!matchExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Match does not exist");
  }

  const matchSchedule = await Schedule.find({ matchNumber });
  const currentMatch = matchSchedule[0];

  const teams = [
    currentMatch.r1,
    currentMatch.r2,
    currentMatch.r3,
    currentMatch.b1,
    currentMatch.b2,
    currentMatch.b3,
  ];
  let results = [];
  for (let team of teams) {
    const pipeline = [
      {
        $match: {
          teamID: team,
          autoData: {
            $exists: true,
          },
          teleData: {
            $exists: true,
          },
          endGameData: {
            $exists: true,
          },
        },
      },
      {
        $group: {
          _id: "$teamID",
          matchesPlayed: { $sum: 1 },
          avgAutoCubePickup: {
            $avg: "$autoData.autoCubePickup",
          },
          avgAutoCubeHighAttempt: {
            $avg: "$autoData.autoCubeHighAttempt",
          },
          avgAutoCubeHighScored: {
            $avg: "$autoData.autoCubeHighScored",
          },
          avgAutoCubeMedAttempt: {
            $avg: "$autoData.autoCubeMedAttempt",
          },
          avgAutoCubeMedScored: {
            $avg: "$autoData.autoCubeMedScored",
          },
          avgAutoCubeLowAttempt: {
            $avg: "$autoData.autoCubeLowAttempt",
          },
          avgAutoCubeLowScored: {
            $avg: "$autoData.autoCubeLowScored",
          },
          avgAutoConePickup: {
            $avg: "$autoData.autoConePickup",
          },
          avgAutoConeHighAttempt: {
            $avg: "$autoData.autoConeHighAttempt",
          },
          avgAutoConeHighScored: {
            $avg: "$autoData.autoConeHighScored",
          },
          avgAutoConeMedAttempt: {
            $avg: "$autoData.autoConeMedAttempt",
          },
          avgAutoConeMedScored: {
            $avg: "$autoData.autoConeMedScored",
          },
          avgAutoConeLowAttempt: {
            $avg: "$autoData.autoConeLowAttempt",
          },
          avgAutoConeLowScored: {
            $avg: "$autoData.autoConeLowScored",
          },
          mobilitySuccess: {
            $sum: {
              $cond: ["$autoData.mobility", 1, 0],
            },
          },
          autoDockedSuccess: {
            $sum: {
              $cond: ["$autoData.autoDocked", 1, 0],
            },
          },
          autoEngagedSuccess: {
            $sum: {
              $cond: ["$autoData.autoEngaged", 1, 0],
            },
          },
          avgTeleCubeFloorPickup: {
            $avg: "$teleData.teleCubeFloorPickup",
          },
          avgTeleCubeHumanLoad: {
            $avg: "$teleData.teleCubeHumanLoad",
          },
          avgTeleCubeHighAttempt: {
            $avg: "$teleData.teleCubeHighAttempt",
          },
          avgTeleCubeHighScored: {
            $avg: "$teleData.teleCubeHighScored",
          },
          avgTeleCubeMedAttempt: {
            $avg: "$teleData.teleCubeMedAttempt",
          },
          avgTeleCubeMedScored: {
            $avg: "$teleData.teleCubeMedScored",
          },
          avgTeleCubeLowAttempt: {
            $avg: "$teleData.teleCubeLowAttempt",
          },
          avgTeleCubeLowScored: {
            $avg: "$teleData.teleCubeLowScored",
          },
          avgTeleConeFloorPickup: {
            $avg: "$teleData.teleConeFloorPickup",
          },
          avgTeleConeHumanLoad: {
            $avg: "$teleData.teleConeHumanLoad",
          },
          avgTeleConeHighAttempt: {
            $avg: "$teleData.teleConeHighAttempt",
          },
          avgTeleConeHighScored: {
            $avg: "$teleData.teleConeHighScored",
          },
          avgTeleConeMedAttempt: {
            $avg: "$teleData.teleConeMedAttempt",
          },
          avgTeleConeMedScored: {
            $avg: "$teleData.teleConeMedScored",
          },
          avgTeleConeLowAttempt: {
            $avg: "$teleData.teleConeLowAttempt",
          },
          avgTeleConeLowScored: {
            $avg: "$teleData.teleConeLowScored",
          },
          teleParkedSuccess: {
            $sum: {
              $cond: ["$endGameData.park", 1, 0],
            },
          },
          teleDockedSuccess: {
            $sum: {
              $cond: ["$endGameData.docked", 1, 0],
            },
          },
          teleEngagedSuccess: {
            $sum: {
              $cond: ["$endGameData.engaged", 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          matchesPlayed: 1,
          avgAutoCubePickup: 1,
          avgAutoCubeHighAttempt: 1,
          avgAutoCubeHighScored: 1,
          avgAutoCubeMedAttempt: 1,
          avgAutoCubeMedScored: 1,
          avgAutoCubeLowAttempt: 1,
          avgAutoCubeLowScored: 1,
          avgAutoConePickup: 1,
          avgAutoConeHighAttempt: 1,
          avgAutoConeHighScored: 1,
          avgAutoConeMedAttempt: 1,
          avgAutoConeMedScored: 1,
          avgAutoConeLowAttempt: 1,
          avgAutoConeLowScored: 1,
          avgTeleCubeFloorPickup: 1,
          avgTeleCubeHumanLoad: 1,
          avgTeleCubeHighAttempt: 1,
          avgTeleCubeHighScored: 1,
          avgTeleCubeMedAttempt: 1,
          avgTeleCubeMedScored: 1,
          avgTeleCubeLowAttempt: 1,
          avgTeleCubeLowScored: 1,
          avgTeleConeFloorPickup: 1,
          avgTeleConeHumanLoad: 1,
          avgTeleConeHighAttempt: 1,
          avgTeleConeHighScored: 1,
          avgTeleConeMedAttempt: 1,
          avgTeleConeMedScored: 1,
          avgTeleConeLowAttempt: 1,
          avgTeleConeLowScored: 1,
          mobilityPercent: {
            $multiply: [
              { $divide: ["$mobilitySuccess", "$matchesPlayed"] },
              100,
            ],
          },
          autoDockedPercent: {
            $multiply: [
              { $divide: ["$autoDockedSuccess", "$matchesPlayed"] },
              100,
            ],
          },
          autoEngagedPercent: {
            $multiply: [
              { $divide: ["$autoEngagedSuccess", "$matchesPlayed"] },
              100,
            ],
          },
          autoHighGoalPointAvg: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: ["$avgAutoCubeHighScored", "$avgAutoConeHighScored"],
                  },
                  "$matchesPlayed",
                ],
              },
              6,
            ],
          },
          autoMedGoalPointAvg: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: ["$avgAutoCubeMedScored", "$avgAutoConeMedScored"],
                  },
                  "$matchesPlayed",
                ],
              },
              4,
            ],
          },
          autoLowGoalPointAvg: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: ["$avgAutoCubeLowScored", "$avgAutoConeLowScored"],
                  },
                  "$matchesPlayed",
                ],
              },
              3,
            ],
          },
          teleHighGoalPointAvg: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: ["$avgTeleCubeHighScored", "$avgTeleConeHighScored"],
                  },
                  "$matchesPlayed",
                ],
              },
              5,
            ],
          },
          teleMedGoalPointAvg: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: ["$avgTeleCubeMedScored", "$avgTeleConeMedScored"],
                  },
                  "$matchesPlayed",
                ],
              },
              3,
            ],
          },
          teleLowGoalPointAvg: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: ["$avgTeleCubeLowScored", "$avgTeleConeLowScored"],
                  },
                  "$matchesPlayed",
                ],
              },
              2,
            ],
          },
          parkedPercent: {
            $multiply: [
              { $divide: ["$teleParkedSuccess", "$matchesPlayed"] },
              100,
            ],
          },
          dockedPercent: {
            $multiply: [
              { $divide: ["$teleDockedSuccess", "$matchesPlayed"] },
              100,
            ],
          },
          engagedPercent: {
            $multiply: [
              { $divide: ["$teleEngagedSuccess", "$matchesPlayed"] },
              100,
            ],
          },
        },
      },
    ];
    const subResults = await MatchData.aggregate(pipeline);
    results.push(subResults);
    console.log(subResults);
  }

  return results;
};

const getTeamSummary = async (teamNum) => {
  const pipeline = [
    {
      $match: {
        teamID: teamNum,
        autoData: {
          $exists: true,
        },
        teleData: {
          $exists: true,
        },
        endGameData: {
          $exists: true,
        },
      },
    },
    {
      $group: {
        _id: "$teamID",
        matchesPlayed: { $sum: 1 },
        avgAutoCubePickup: {
          $avg: "$autoData.autoCubePickup",
        },
        avgAutoCubeHighAttempt: {
          $avg: "$autoData.autoCubeHighAttempt",
        },
        avgAutoCubeHighScored: {
          $avg: "$autoData.autoCubeHighScored",
        },
        avgAutoCubeMedAttempt: {
          $avg: "$autoData.autoCubeMedAttempt",
        },
        avgAutoCubeMedScored: {
          $avg: "$autoData.autoCubeMedScored",
        },
        avgAutoCubeLowAttempt: {
          $avg: "$autoData.autoCubeLowAttempt",
        },
        avgAutoCubeLowScored: {
          $avg: "$autoData.autoCubeLowScored",
        },
        avgAutoConePickup: {
          $avg: "$autoData.autoConePickup",
        },
        avgAutoConeHighAttempt: {
          $avg: "$autoData.autoConeHighAttempt",
        },
        avgAutoConeHighScored: {
          $avg: "$autoData.autoConeHighScored",
        },
        avgAutoConeMedAttempt: {
          $avg: "$autoData.autoConeMedAttempt",
        },
        avgAutoConeMedScored: {
          $avg: "$autoData.autoConeMedScored",
        },
        avgAutoConeLowAttempt: {
          $avg: "$autoData.autoConeLowAttempt",
        },
        avgAutoConeLowScored: {
          $avg: "$autoData.autoConeLowScored",
        },
        mobilitySuccess: {
          $sum: {
            $cond: ["$autoData.mobility", 1, 0],
          },
        },
        autoDockedSuccess: {
          $sum: {
            $cond: ["$autoData.autoDocked", 1, 0],
          },
        },
        autoEngagedSuccess: {
          $sum: {
            $cond: ["$autoData.autoEngaged", 1, 0],
          },
        },
        avgTeleCubeFloorPickup: {
          $avg: "$teleData.teleCubeFloorPickup",
        },
        avgTeleCubeHumanLoad: {
          $avg: "$teleData.teleCubeHumanLoad",
        },
        avgTeleCubeHighAttempt: {
          $avg: "$teleData.teleCubeHighAttempt",
        },
        avgTeleCubeHighScored: {
          $avg: "$teleData.teleCubeHighScored",
        },
        avgTeleCubeMedAttempt: {
          $avg: "$teleData.teleCubeMedAttempt",
        },
        avgTeleCubeMedScored: {
          $avg: "$teleData.teleCubeMedScored",
        },
        avgTeleCubeLowAttempt: {
          $avg: "$teleData.teleCubeLowAttempt",
        },
        avgTeleCubeLowScored: {
          $avg: "$teleData.teleCubeLowScored",
        },
        avgTeleConeFloorPickup: {
          $avg: "$teleData.teleConeFloorPickup",
        },
        avgTeleConeHumanLoad: {
          $avg: "$teleData.teleConeHumanLoad",
        },
        avgTeleConeHighAttempt: {
          $avg: "$teleData.teleConeHighAttempt",
        },
        avgTeleConeHighScored: {
          $avg: "$teleData.teleConeHighScored",
        },
        avgTeleConeMedAttempt: {
          $avg: "$teleData.teleConeMedAttempt",
        },
        avgTeleConeMedScored: {
          $avg: "$teleData.teleConeMedScored",
        },
        avgTeleConeLowAttempt: {
          $avg: "$teleData.teleConeLowAttempt",
        },
        avgTeleConeLowScored: {
          $avg: "$teleData.teleConeLowScored",
        },
        teleParkedSuccess: {
          $sum: {
            $cond: ["$endGameData.park", 1, 0],
          },
        },
        teleDockedSuccess: {
          $sum: {
            $cond: ["$endGameData.docked", 1, 0],
          },
        },
        teleEngagedSuccess: {
          $sum: {
            $cond: ["$endGameData.engaged", 1, 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        matchesPlayed: 1,
        avgAutoCubePickup: 1,
        avgAutoCubeHighAttempt: 1,
        avgAutoCubeHighScored: 1,
        avgAutoCubeMedAttempt: 1,
        avgAutoCubeMedScored: 1,
        avgAutoCubeLowAttempt: 1,
        avgAutoCubeLowScored: 1,
        avgAutoConePickup: 1,
        avgAutoConeHighAttempt: 1,
        avgAutoConeHighScored: 1,
        avgAutoConeMedAttempt: 1,
        avgAutoConeMedScored: 1,
        avgAutoConeLowAttempt: 1,
        avgAutoConeLowScored: 1,
        avgTeleCubeFloorPickup: 1,
        avgTeleCubeHumanLoad: 1,
        avgTeleCubeHighAttempt: 1,
        avgTeleCubeHighScored: 1,
        avgTeleCubeMedAttempt: 1,
        avgTeleCubeMedScored: 1,
        avgTeleCubeLowAttempt: 1,
        avgTeleCubeLowScored: 1,
        avgTeleConeFloorPickup: 1,
        avgTeleConeHumanLoad: 1,
        avgTeleConeHighAttempt: 1,
        avgTeleConeHighScored: 1,
        avgTeleConeMedAttempt: 1,
        avgTeleConeMedScored: 1,
        avgTeleConeLowAttempt: 1,
        avgTeleConeLowScored: 1,
        mobilityPercent: {
          $multiply: [{ $divide: ["$mobilitySuccess", "$matchesPlayed"] }, 100],
        },
        autoDockedPercent: {
          $multiply: [
            { $divide: ["$autoDockedSuccess", "$matchesPlayed"] },
            100,
          ],
        },
        autoEngagedPercent: {
          $multiply: [
            { $divide: ["$autoEngagedSuccess", "$matchesPlayed"] },
            100,
          ],
        },
        autoHighGoalPointAvg: {
          $multiply: [
            {
              $divide: [
                {
                  $add: ["$avgAutoCubeHighScored", "$avgAutoConeHighScored"],
                },
                "$matchesPlayed",
              ],
            },
            6,
          ],
        },
        autoMedGoalPointAvg: {
          $multiply: [
            {
              $divide: [
                {
                  $add: ["$avgAutoCubeMedScored", "$avgAutoConeMedScored"],
                },
                "$matchesPlayed",
              ],
            },
            4,
          ],
        },
        autoLowGoalPointAvg: {
          $multiply: [
            {
              $divide: [
                {
                  $add: ["$avgAutoCubeLowScored", "$avgAutoConeLowScored"],
                },
                "$matchesPlayed",
              ],
            },
            3,
          ],
        },
        teleHighGoalPointAvg: {
          $multiply: [
            {
              $divide: [
                {
                  $add: ["$avgTeleCubeHighScored", "$avgTeleConeHighScored"],
                },
                "$matchesPlayed",
              ],
            },
            5,
          ],
        },
        teleMedGoalPointAvg: {
          $multiply: [
            {
              $divide: [
                {
                  $add: ["$avgTeleCubeMedScored", "$avgTeleConeMedScored"],
                },
                "$matchesPlayed",
              ],
            },
            3,
          ],
        },
        teleLowGoalPointAvg: {
          $multiply: [
            {
              $divide: [
                {
                  $add: ["$avgTeleCubeLowScored", "$avgTeleConeLowScored"],
                },
                "$matchesPlayed",
              ],
            },
            2,
          ],
        },
        parkedPercent: {
          $multiply: [
            { $divide: ["$teleParkedSuccess", "$matchesPlayed"] },
            100,
          ],
        },
        dockedPercent: {
          $multiply: [
            { $divide: ["$teleDockedSuccess", "$matchesPlayed"] },
            100,
          ],
        },
        engagedPercent: {
          $multiply: [
            { $divide: ["$teleEngagedSuccess", "$matchesPlayed"] },
            100,
          ],
        },
      },
    },
  ];
  const result = await MatchData.aggregate(pipeline);
  console.log(result);
  console.log(typeof result);

  return result;
};

const getTeamDataForMatch = async (teamID, matchNumber) => {
  return MatchData.find({ teamID, matchNumber });
};

const getAllMatchSummary = async () => {

  const teams = [
    "frc188",
    "frc1241",
    "frc1310",
    "frc1325",
    "frc1360",
    "frc1334",
    "frc1374",
    "frc2056",
    "frc2200",
    "frc2386",
    "frc2609",
    "frc4015",
    "frc4343",
    "frc4992",
    "frc5406",
    "frc6135",
    "frc6140",
    "frc6378",
    "frc6854",
    "frc6865",
    "frc6975",
    "frc6978",
    "frc6992",
    "frc7022",
    "frc7058",
    "frc7200",
    "frc7509",
    "frc7520",
    "frc7623",
    "frc7659",
    "frc7722",
    "frc8764",
    "frc8765",
    "frc8884",
    "frc9062",
    "frc9262",
  ];
  let results = [];
  for (let team of teams) {
    const pipeline = [
      {
        $match: {
          teamID: team,
          autoData: {
            $exists: true,
          },
          teleData: {
            $exists: true,
          },
          endGameData: {
            $exists: true,
          },
        },
      },
      {
        $group: {
          _id: "$teamID",
          matchesPlayed: { $sum: 1 },
          avgAutoCubePickup: {
            $avg: "$autoData.autoCubePickup",
          },
          avgAutoCubeHighAttempt: {
            $avg: "$autoData.autoCubeHighAttempt",
          },
          avgAutoCubeHighScored: {
            $avg: "$autoData.autoCubeHighScored",
          },
          avgAutoCubeMedAttempt: {
            $avg: "$autoData.autoCubeMedAttempt",
          },
          avgAutoCubeMedScored: {
            $avg: "$autoData.autoCubeMedScored",
          },
          avgAutoCubeLowAttempt: {
            $avg: "$autoData.autoCubeLowAttempt",
          },
          avgAutoCubeLowScored: {
            $avg: "$autoData.autoCubeLowScored",
          },
          avgAutoConePickup: {
            $avg: "$autoData.autoConePickup",
          },
          avgAutoConeHighAttempt: {
            $avg: "$autoData.autoConeHighAttempt",
          },
          avgAutoConeHighScored: {
            $avg: "$autoData.autoConeHighScored",
          },
          avgAutoConeMedAttempt: {
            $avg: "$autoData.autoConeMedAttempt",
          },
          avgAutoConeMedScored: {
            $avg: "$autoData.autoConeMedScored",
          },
          avgAutoConeLowAttempt: {
            $avg: "$autoData.autoConeLowAttempt",
          },
          avgAutoConeLowScored: {
            $avg: "$autoData.autoConeLowScored",
          },
          mobilitySuccess: {
            $sum: {
              $cond: ["$autoData.mobility", 1, 0],
            },
          },
          autoDockedSuccess: {
            $sum: {
              $cond: ["$autoData.autoDocked", 1, 0],
            },
          },
          autoEngagedSuccess: {
            $sum: {
              $cond: ["$autoData.autoEngaged", 1, 0],
            },
          },
          avgTeleCubeFloorPickup: {
            $avg: "$teleData.teleCubeFloorPickup",
          },
          avgTeleCubeHumanLoad: {
            $avg: "$teleData.teleCubeHumanLoad",
          },
          avgTeleCubeHighAttempt: {
            $avg: "$teleData.teleCubeHighAttempt",
          },
          avgTeleCubeHighScored: {
            $avg: "$teleData.teleCubeHighScored",
          },
          avgTeleCubeMedAttempt: {
            $avg: "$teleData.teleCubeMedAttempt",
          },
          avgTeleCubeMedScored: {
            $avg: "$teleData.teleCubeMedScored",
          },
          avgTeleCubeLowAttempt: {
            $avg: "$teleData.teleCubeLowAttempt",
          },
          avgTeleCubeLowScored: {
            $avg: "$teleData.teleCubeLowScored",
          },
          avgTeleConeFloorPickup: {
            $avg: "$teleData.teleConeFloorPickup",
          },
          avgTeleConeHumanLoad: {
            $avg: "$teleData.teleConeHumanLoad",
          },
          avgTeleConeHighAttempt: {
            $avg: "$teleData.teleConeHighAttempt",
          },
          avgTeleConeHighScored: {
            $avg: "$teleData.teleConeHighScored",
          },
          avgTeleConeMedAttempt: {
            $avg: "$teleData.teleConeMedAttempt",
          },
          avgTeleConeMedScored: {
            $avg: "$teleData.teleConeMedScored",
          },
          avgTeleConeLowAttempt: {
            $avg: "$teleData.teleConeLowAttempt",
          },
          avgTeleConeLowScored: {
            $avg: "$teleData.teleConeLowScored",
          },
          teleParkedSuccess: {
            $sum: {
              $cond: ["$endGameData.park", 1, 0],
            },
          },
          teleDockedSuccess: {
            $sum: {
              $cond: ["$endGameData.docked", 1, 0],
            },
          },
          teleEngagedSuccess: {
            $sum: {
              $cond: ["$endGameData.engaged", 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          matchesPlayed: 1,
          avgAutoCubePickup: 1,
          avgAutoCubeHighAttempt: 1,
          avgAutoCubeHighScored: 1,
          avgAutoCubeMedAttempt: 1,
          avgAutoCubeMedScored: 1,
          avgAutoCubeLowAttempt: 1,
          avgAutoCubeLowScored: 1,
          avgAutoConePickup: 1,
          avgAutoConeHighAttempt: 1,
          avgAutoConeHighScored: 1,
          avgAutoConeMedAttempt: 1,
          avgAutoConeMedScored: 1,
          avgAutoConeLowAttempt: 1,
          avgAutoConeLowScored: 1,
          avgTeleCubeFloorPickup: 1,
          avgTeleCubeHumanLoad: 1,
          avgTeleCubeHighAttempt: 1,
          avgTeleCubeHighScored: 1,
          avgTeleCubeMedAttempt: 1,
          avgTeleCubeMedScored: 1,
          avgTeleCubeLowAttempt: 1,
          avgTeleCubeLowScored: 1,
          avgTeleConeFloorPickup: 1,
          avgTeleConeHumanLoad: 1,
          avgTeleConeHighAttempt: 1,
          avgTeleConeHighScored: 1,
          avgTeleConeMedAttempt: 1,
          avgTeleConeMedScored: 1,
          avgTeleConeLowAttempt: 1,
          avgTeleConeLowScored: 1,
          mobilityPercent: {
            $multiply: [
              { $divide: ["$mobilitySuccess", "$matchesPlayed"] },
              100,
            ],
          },
          autoDockedPercent: {
            $multiply: [
              { $divide: ["$autoDockedSuccess", "$matchesPlayed"] },
              100,
            ],
          },
          autoEngagedPercent: {
            $multiply: [
              { $divide: ["$autoEngagedSuccess", "$matchesPlayed"] },
              100,
            ],
          },
          autoHighGoalPointAvg: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: ["$avgAutoCubeHighScored", "$avgAutoConeHighScored"],
                  },
                  "$matchesPlayed",
                ],
              },
              6,
            ],
          },
          autoMedGoalPointAvg: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: ["$avgAutoCubeMedScored", "$avgAutoConeMedScored"],
                  },
                  "$matchesPlayed",
                ],
              },
              4,
            ],
          },
          autoLowGoalPointAvg: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: ["$avgAutoCubeLowScored", "$avgAutoConeLowScored"],
                  },
                  "$matchesPlayed",
                ],
              },
              3,
            ],
          },
          teleHighGoalPointAvg: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: ["$avgTeleCubeHighScored", "$avgTeleConeHighScored"],
                  },
                  "$matchesPlayed",
                ],
              },
              5,
            ],
          },
          teleMedGoalPointAvg: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: ["$avgTeleCubeMedScored", "$avgTeleConeMedScored"],
                  },
                  "$matchesPlayed",
                ],
              },
              3,
            ],
          },
          teleLowGoalPointAvg: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: ["$avgTeleCubeLowScored", "$avgTeleConeLowScored"],
                  },
                  "$matchesPlayed",
                ],
              },
              2,
            ],
          },
          parkedPercent: {
            $multiply: [
              { $divide: ["$teleParkedSuccess", "$matchesPlayed"] },
              100,
            ],
          },
          dockedPercent: {
            $multiply: [
              { $divide: ["$teleDockedSuccess", "$matchesPlayed"] },
              100,
            ],
          },
          engagedPercent: {
            $multiply: [
              { $divide: ["$teleEngagedSuccess", "$matchesPlayed"] },
              100,
            ],
          },
        },
      },
    ];
    const subResults = await MatchData.aggregate(pipeline);
    results.push(subResults);
    console.log(subResults);
  }

  return results;
};

module.exports = {
  getMatchSummary,
  getTeamSummary,
  getTeamDataForMatch,
  getAllMatchSummary,
};
