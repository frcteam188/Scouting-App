const { Schedule } = require('../models');

const createMatch = async (Body) => {
  return Schedule.create(Body);
};

module.exports = { createMatch };
