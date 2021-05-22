import createHandlers from "../../../lib/rest-utils";
import LevelModel from "../../../models/level-model";
import UserModel from "../../../models/user-model";
import { getSession } from "../../../lib/auth-cookies";

const handlers = {
  GET: async (req, res) => {
    const levelModel = new LevelModel();
    const { levelId } = req.query;
    const { email } = (await getSession(req)) || {};
    // if no session throw unauthorised error
    if (!email) {
      res.status(403).send(`Please login to access this API route`);
      return;
    }
    if (!levelId) {
      res
        .status(400)
        .send(`Either levelId is missing from request query or is Invalid`);
      return;
    }
    // TODO check if user has access to the below level
    console.log(`Getting level ${levelId} for ${email}`);
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

    const levelQuery = {
      _id: levelId
    };
    // extract just the name,unlocksAt and the hints.
    const levelProjection = {
      _id: false,
      name: true,
      unlocksAt: true,
      hints: true,
      gallery: true
    };

    const level = await JSON.parse(
      await levelModel.getLevel(levelQuery, levelProjection)
    );

    // TODO: Extract which levels the user has unlocked.
    // Filter out level descriptions which are not unlocked
    // level = levelModel.processLayer(level);

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

    res.status(200).json({ ...level[0] });
  }
};

export default async function Level(req, res) {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
