const { Schedule } = require('../models');

const createMatch = async (Body) => {
  return Schedule.create(Body);
};

const getMatchByNumber = async (matchNumber) => {
  return Schedule.findOne({ matchNumber });
};

module.exports = { createMatch, getMatchByNumber };
