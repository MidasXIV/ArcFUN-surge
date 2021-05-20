import LevelModel from "../models/level-model";
import { parseDate } from "./date-time";

/**
 * function takes in all users and levels
 */
export default function getRanks(users, levels) {
  const NUM_OF_LEVELS = levels.length ?? 0;
  const HOUR = 60 * 60 * 1000;
  const TIME_BLOCKS = {
    HOURS_3: 3 * HOUR,
    HOURS_9: 9 * HOUR,
    HOURS_12: 12 * HOUR,
    HOURS_24: 24 * HOUR,
    HOURS_36: 36 * HOUR
  };

  const levelModel = new LevelModel();

  const userRanks = users.map((user) => {
    console.log(`Finding rank of user :: ${user.email}`);
    const userObject = { ...user };
    const userLevelStats = {};
    const DEFAULT_POINTS = 0;
    const points =
      user.statistics?.reduce((accumulator, level) => {
        let levelPoints = 0;
        userLevelStats[level.levelId] = {};
        // check if level is unlocked before the level unlocks time
        // +1000 if level is unlocked
        // TODO: multiply total points by 3   if unlocked before HOURS_36
        // TODO: multiply total points by 2   if unlocked before HOURS_24
        // TODO: multiply total points by 1.5 if unlocked before HOURS_12
        const levelUnlocksAt = levelModel.getLevelUnlockTime(
          levels,
          level.levelId
        );
        const levelUnlockedAt = parseDate(level.unlockedAt);
        const levelUnlockedTimeDifference = levelUnlocksAt - levelUnlockedAt;
        /** level is unlocked if user has unlockAt time smaller
         * than the given level unlocksAt time */
        const isLevelUnlocked = levelUnlockedTimeDifference > 0;
        userLevelStats[level.levelId].isLevelUnlocked = isLevelUnlocked;

        if (isLevelUnlocked) {
          levelPoints += 1000;
        }

        // check if level is solved
        // +1000 if level is solved
        // +3000 -solved within- HOURS_3
        // +2000 -solved within- HOURS_6
        // +1000 -solved within- HOURS_9
        // +500 -solved within- HOURS_12

        const isLevelSolved = Boolean(level.solvedAt);
        userLevelStats[level.levelId].isLevelSolved = isLevelSolved;

        if (isLevelSolved) {
          levelPoints += 1000;

          /** time difference is in milliseconds */
          const levelSolvedTimeDifference =
            parseDate(level.solvedAt) -
            Math.min(levelUnlocksAt, levelUnlockedAt);

          if (levelSolvedTimeDifference < TIME_BLOCKS.HOURS_3) {
            userLevelStats[level.levelId].solvedIn = `Level solved in 3hr: ${
              levelSolvedTimeDifference / HOUR
            }`;
            levelPoints += 3000;
          } else if (levelSolvedTimeDifference < TIME_BLOCKS.HOURS_6) {
            userLevelStats[level.levelId].solvedIn = `Level solved in 6hr: ${
              levelSolvedTimeDifference / HOUR
            }`;
            levelPoints += 2000;
          } else if (levelSolvedTimeDifference < TIME_BLOCKS.HOURS_9) {
            userLevelStats[level.levelId].solvedIn = `Level solved in 9hr: ${
              levelSolvedTimeDifference / HOUR
            }`;
            levelPoints += 1000;
          } else if (levelSolvedTimeDifference < TIME_BLOCKS.HOURS_12) {
            userLevelStats[level.levelId].solvedIn = `Level solved in 12hr: ${
              levelSolvedTimeDifference / HOUR
            }`;
            levelPoints += 500;
          } else {
            userLevelStats[level.levelId].solvedIn = `Level solved in > 12hr: ${
              levelSolvedTimeDifference / HOUR
            }`;
          }
          // check hints taken if level is solved
          // +1000 for 0 hint(s) / +500 for 1 hint(s) / +300 for 2 hint(s)
          const { hintsTaken } = level;
          switch (hintsTaken) {
            case 0:
              levelPoints += 1000;
              break;
            case 1:
              levelPoints += 500;
              break;
            case 2:
              levelPoints += 300;
              break;
            default:
              levelPoints += 0;
          }
        }
        userLevelStats[level.levelId].hints = level.hintsTaken ?? 0;
        userLevelStats[level.levelId].points = levelPoints;
        return accumulator + levelPoints;
      }, DEFAULT_POINTS) ?? DEFAULT_POINTS;

    console.table(userLevelStats);

    userObject.levelStats = userLevelStats;
    userObject.points = points;
    return userObject;
  });

  /** highest first */
  const sortedUserRank = userRanks.sort((user1, user2) =>
    user1.points < user2.points ? 1 : -1
  );

  console.table(sortedUserRank, ["email", "points"]);

  return sortedUserRank;
  // sort userRanks based on the total score of user
}
