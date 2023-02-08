const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const pitScoutingSchema = mongoose.Schema({
  eventID: {
    type: String,
    required: true,
  },
  photos: [
    {
      type: String,
    },
  ],
  // Add other pitscouting information here
});

const teamSchema = mongoose.Schema({
  teamID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  eventNotes: [{ type: pitScoutingSchema }],
});

teamSchema.plugin(toJSON);

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
