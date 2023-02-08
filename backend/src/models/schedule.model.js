const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const scheduleSchema = mongoose.Schema({
  matchNumber: {
    type: Number,
    required: true,
  },
  eventID: {
    type: String,
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

scheduleSchema.index({ matchNumber: 1, eventID: 1 }, { unique: true });

scheduleSchema.plugin(toJSON);
scheduleSchema.plugin(paginate);

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
