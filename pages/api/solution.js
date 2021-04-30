import createHandlers from "../../lib/rest-utils";
import LevelModel from "../../models/level-model";
import UserModel from "../../models/user-model";
import { getSession } from "../../lib/auth-cookies";
import { getCurrentDate } from "../../lib/date-time";

const handlers = {
  GET: async (req, res) => {
    const levelModel = new LevelModel();
    /** extract level Id and solution from query */
    const { levelId, solution } = req.query;

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
        .status(403)
        .send(`Forbidden access. Please unlock the level and try again`);
      return;
    }

    /** do we need a case check ? */
    const isAnswerValid = solution === level.solution;

    if (!isAnswerValid) {
      res.status(200).json({
        status: "failure",
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

    const thisLevel = {
      levelId,
      unlockedAt: level.unlocksAt,
      solvedAt: getCurrentDate(),
      hintsTaken
    };

    res.status(200).json({
      ...level,
      isLevelValid,
      isAnswerValid
    });
  }
};

export default async function Solution(req, res) {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
