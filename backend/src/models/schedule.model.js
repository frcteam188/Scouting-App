const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const scheduleSchema = mongoose.Schema({
  matchNumber: {
    type: Number,
    required: true,
  },
  r1: {
    type: String,
    required: true,
  },
  r2: {
    type: String,
    required: true,
  },
  r3: {
    type: String,
    required: true,
  },
  b1: {
    type: String,
    required: true,
  },
  b2: {
    type: String,
    required: true,
  },
  b3: {
    type: String,
    required: true,
  },
});

scheduleSchema.plugin(toJSON);

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
