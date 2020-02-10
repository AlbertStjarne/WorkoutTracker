const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // connect to other models
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('workout', WorkoutSchema);
