import createHandlers from "../../lib/rest-utils";
import LevelModel from "../../models/level-model";
import UserModel from "../../models/user-model";
import { getSession } from "../../lib/auth-cookies";
import { getCurrentDateISO } from "../../lib/date-time";

const handlers = {
  POST: async (req, res) => {
    const levelModel = new LevelModel();
    /** extract level Id and solution from query */
    const { levelId, solution } = req.body;

    if (!levelId || !solution) {
      res
        .status(400)
        .send(`Either levelId or solution is missing from request quesry`);
      return;
    }

    const { email } = (await getSession(req)) || {};
    // if no session throw unauthorised error

    if (!email) {
      res.status(403).send(`Please login to access this API route`);
      return;
    }

    /** extract the user's, statistics */
    const userModel = new UserModel();
    const userQuery = {
      email
    };
    const userProjection = {
      _id: false,
      statistics: true
    };

    const user = await JSON.parse(
      await userModel.getUser(userQuery, userProjection)
    );

    // do undefined check, throw error
    // Check if level is already solved
    /** used to find when the lvel was unlocked and if the level is solved */
    const currentLevelProfile = userModel.getLevelProfile(user, levelId);
    if (currentLevelProfile?.solvedAt) {
      res.status(200).json({
        status: "completed",
        message: `level:${levelId} is already solved at ${currentLevelProfile.solvedAt}.`
      });
      return;
    }

    /** extract the level, unlocksAt and solution */
    const levelQuery = {
      _id: levelId
    };
    const levelProjection = {
      _id: false,
      solution: true,
      unlocksAt: true,
      hints: true
    };

    const level = await JSON.parse(
      await levelModel.getLevel(levelQuery, levelProjection)
    )[0];

    const hintsTaken = levelModel.getNumberOfHintsUnlocked(level);

    /** check if user has access to the below level */
    const hasUserUnlockedLevel = userModel.hasUserUnlockedLevel(user, levelId);
    const isLevelUnlocked = levelModel.isLevelUnlocked(level);
    const isLevelValid = hasUserUnlockedLevel || isLevelUnlocked;

    /** if level is invalid throw custom error */
    if (!isLevelValid) {
      res
        .status(401)
        .send(`Forbidden access. Please unlock the level and try again`);
      return;
    }

    /** do we need a case check ? */
    const isAnswerValid = solution === level.solution;

    if (!isAnswerValid) {
      res.status(200).json({
        status: "fail",
        message: `${solution} is not the right answer to this level.`
      });
      return;
    }

    /** if soultion is correct
     * > find all levels user has unlocked
     * > find all levels
     * -> extract which ones are locked
     * > unlock the first locked level for the user.
     * -> add this to statistics DS along with time unlockedAt
     */

    // Get all levels user has unlocked
    const levelsUnlockedByUser = userModel.getLevelsUnlocked(user);
    // Get all levels status
    const levelsStatus = await levelModel.getAllLevelStatus();

    const newUnlockedLevel = levelModel.unlockNewLevel(
      levelsUnlockedByUser,
      levelsStatus
    );

    /** case where the level is unlocked via timer */
    // the level's unlocked At should be taken in account
    const thisLevelProfile = {
      levelId,
      unlockedAt: currentLevelProfile?.unlockedAt ?? level.unlocksAt,
      solvedAt: getCurrentDateISO(),
      hintsTaken
    };

    let updatedStatistics = userModel.updateLevelProfile(
      user.statistics,
      thisLevelProfile
    );
    // will return undefined when all levels are unlocked
    if (newUnlockedLevel) {
      const newUnlockedLevelProfile = {
        levelId: newUnlockedLevel,
        unlockedAt: getCurrentDateISO()
      };
      updatedStatistics = userModel.updateLevelProfile(
        updatedStatistics,
        newUnlockedLevelProfile
      );
    }

    userModel.updateUser(userQuery, {
      statistics: updatedStatistics
    });

    res.status(200).json({
      status: "correct",
      message: `${solution} is the right answer to this level; A new level is unlocked for you.`,
      ...thisLevelProfile,
      isAnswerValid,
      newUnlockedLevel
    });
  }
};

export default async function Solution(req, res) {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
