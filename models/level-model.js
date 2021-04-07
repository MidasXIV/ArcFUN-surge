/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { connectToDatabase } from "../lib/mongodb";
import Level from "../schemas/level-schema";

export default class LeveLModel {
  async getLevelIDs() {
    console.log(`Fetching Level IDs`);
    const { db } = await connectToDatabase();
    const levelIDs = await db
      .collection("levels")
      .find()
      .map((x) => x._id)
      .toArray();
    console.log(levelIDs);
    return JSON.stringify(levelIDs);
  }

  async getLevel(query = {}, projection = {}) {
    const { db } = await connectToDatabase();
    const levels = await Level.find(query, projection);
    return JSON.stringify(levels);
  }

  async createLevel(LevelProps) {
    console.log(`creating new Level: ${JSON.stringify(LevelProps.name)}`);
    const { client } = await connectToDatabase();
    return Level.create({
      ...LevelProps
    });
  }

  processLayer(levels) {
    const currentDateISO = new Date().toISOString();
    const currentDate = new Date(currentDateISO);

    return levels.map((level) => {
      const levelUnlocksAt = new Date(level.unlocksAt);
      const state = currentDate - levelUnlocksAt > 0 ? "" : "disabled";

      const summary = `level ${
        state === "disabled" ? "Unlocks" : "Unlocked"
      } at ${currentDate - levelUnlocksAt} - ${currentDateISO}`;

      const hintsUnlocked = level.hints.reduce((hintsUnlocked, hint) => {
        const hintUnlocksAt = new Date(hint.unlocksAt);
        const unlocked = currentDate - hintUnlocksAt > 0 ? 1 : 0;
        return hintsUnlocked + unlocked;
      }, 0);

      return {
        title: level.name,
        summary,
        state,
        hintsUnlocked
      };
    });
  }
}
