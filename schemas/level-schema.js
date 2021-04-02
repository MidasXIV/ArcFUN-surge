import { Schema, model, models } from "mongoose";

const HintsSchema = new Schema({
  description: String,
  unlocksAt: String
});

const GallerySchema = new Schema({
  order: String,
  alt: String,
  src: String
});

const LevelSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  solution: {
    type: String,
    required: [true, "Please provide a solution for the level"],
    unique: false
  },
  unlocksAt: {
    type: String,
    required: [true, "Please provide a when level Unlocks"],
    default: 1
  },
  gallery: {
    type: [GallerySchema],
    required: true
  },
  hints: {
    type: [HintsSchema],
    required: true
  }
});

module.exports = models.level || model("level", LevelSchema);
