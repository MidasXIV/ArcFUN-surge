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
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: [true, "Email already in use"],
    unique: true
  },
  name: {
    type: String,
    required: [true, "Username already in use"],
    unique: true
  },
  level: {
    type: Number,
    required: [true, "Please provide a level"]
  },
  statistics: [LevelStatisticsSchema]
});

module.exports = models.User || model('User', UserSchema);