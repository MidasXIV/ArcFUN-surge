/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { getCurrentDate, parseDate } from "../lib/date-time";
import { connectToDatabase } from "../lib/mongodb";
import Level from "../schemas/level-schema";

export default class LeveLModel {
  async getLevelIDs() {
    const { db } = await connectToDatabase();

    const levelQuery = {};
    const levelProjection = { _id: true };
    let levelIDs = await this.getLevel(levelQuery, levelProjection);
    levelIDs = await JSON.parse(levelIDs).map((x) => x._id);

    return JSON.stringify(levelIDs);
  }

  /**
   * function returns a list of locked and unlocked levels _ids 
   * based on their unlock time. 
   * @returns { locked: [] , unlocked: [] }

   */
  async getAllLevelStatus() {
    // since we want all level query object is empty.
    const levelQuery = {};
    // extract just the name,unlocksAt.
    const levelProjection = {
      _id: true,
      unlocksAt: true
    };

    const levels = await JSON.parse(
      await this.getLevel(levelQuery, levelProjection)
    );
    const defaultAccumulator = {
      locked: [],
      unlocked: []
    };
    return levels.reduce((accumulator, level) => {
      const isUnlocked = this.isLevelUnlocked(level);
      const state = isUnlocked ? "unlocked" : "locked";
      accumulator[state].push(level._id);
      return accumulator;
    }, defaultAccumulator);
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

  isLevelUnlocked(level) {
    const currentDate = getCurrentDate();
    const levelUnlocksAt = parseDate(level.unlocksAt);
    return currentDate - levelUnlocksAt >= 0;
  }

  getNumberOfHintsUnlocked(level) {
    const currentDate = getCurrentDate();
    const hintsUnlocked = level.hints.reduce((_hintsUnlocked, hint) => {
      const hintUnlocksAt = parseDate(hint.unlocksAt);
      const unlocked = currentDate - hintUnlocksAt > 0 ? 1 : 0;
      return _hintsUnlocked + unlocked;
    }, 0);
    return hintsUnlocked;
  }

  /**
   * TODO: refactor / user descriptive name
   * Abstracted function which iterates over each level and returns the
   * title, summary, state and the hintsUnlocked props which are understood
   * by the level cards.
   * @param {*} levels All levels present in database
   * @param {*} levelsUnlockedByUser list of levels unlocked by User
   * @returns
   */
  processLayer(levels, levelsUnlockedByUser, levelsSolvedByUser) {
    const currentDate = getCurrentDate();
    return levels.map((level) => {
      const isLevelUnlockedByUser = levelsUnlockedByUser.includes(level._id);
      const isLevelSolvedByUser = levelsSolvedByUser.includes(level._id);
      const levelUnlocksAt = parseDate(level.unlocksAt);
      // eslint-disable-next-line no-nested-ternary
      let state;
      if (isLevelSolvedByUser) {
        state = "completed";
      } else if (isLevelUnlockedByUser) {
        state = "";
      } else {
        state = "disabled";
      }
      const summary = `level ${
        state === "disabled" ? "Unlocks" : "Unlocked"
      } at ${currentDate - levelUnlocksAt}`;

      const hintsUnlocked = this.getNumberOfHintsUnlocked(level);

      return {
        id: level._id,
        title: level.name,
        summary,
        state,
        hintsUnlocked
      };
    });
  }

  /**
   * function takes in levels User has unlocked and
   * all levels unlocked, it picks a level out of locked
   * levels not unlocked by the User
   */
  unlockNewLevel(levelsUnlockedByUser, levelsStatus) {
    /** locked levels not unlocked by the User */
    const lockedLevels = levelsStatus.locked.filter(
      (level) => !levelsUnlockedByUser.includes(level)
    );

    return lockedLevels.shift();
  }
}
