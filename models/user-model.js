import {
  Schema,
  model,
  models
} from 'mongoose';

const LevelStatisticsSchema = new Schema({
  startedAt: Number,
  completedAt: Number,
  hintsTaken: Number,
});

const UserSchema = Schema({
  token: {
    type: String,
    required: false,
    unique: true
  },
  email: {
    type: String,
    required: [true, "Email already in use"],
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: [false, "Username already in use"],
    unique: true
  },
  level: {
    type: Number,
    required: [true, "Please provide a level"],
    default: 1
  },
  statistics: {
    type: [LevelStatisticsSchema],
    required: false
  }
});

module.exports = models.user || model('user', UserSchema);