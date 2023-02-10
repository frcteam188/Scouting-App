const { Schedule } = require('../models');

const createMatch = async (Body) => {
  return Schedule.create(Body);
};

const getMatchByNumber = async (matchNumber) => {
  return Schedule.find({ matchNumber });
};

/**
 * Query for matches
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMatches = async (filter, options) => {
  const matches = await Schedule.paginate(filter, options);
  return matches;
};

module.exports = { createMatch, getMatchByNumber, queryMatches };
