const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { Team } = require('./team.model');
const { Schedule } = require('./team.model');

const eventSchema = mongoose.Schema({
  eventID: {
    type: String,
    required: true,
    unique: true,
  },
  teams: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Team' }],
  matchSchedule: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Schedule' }],
});
