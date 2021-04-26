import createHandlers from "../../lib/rest-utils";
import LevelModel from "../../models/level-model";
import UserModel from "../../models/user-model";
import { getSession } from "../../lib/auth-cookies";

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
      unlocksAt: true
    };

    const level = await JSON.parse(
      await levelModel.getLevel(levelQuery, levelProjection)
    )[0];

    /** check if user has access to the below level */
    const hasUserUnlockedLevel = userModel.hasUserUnlockedLevel(user, levelId);
    const isLevelUnlocked = levelModel.isLevelUnlocked(level);
    const isLevelValid = hasUserUnlockedLevel || isLevelUnlocked;

    console.log(isLevelUnlocked);
    /** if soultion is correct
     * > find all levels user has unlocked
     * > find all levels
     * -> extract which ones are locked
     * > unlock the first locked level for the user.
     * -> add this to statistics DS along with time unlockedAt
     */

    res.status(200).json({
      ...level,
      isLevelValid
    });
  }
};

export default async function Solution(req, res) {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
