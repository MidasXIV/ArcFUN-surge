import createHandlers from "../../../lib/rest-utils";
import LevelModel from "../../../models/level-model";
import UserModel from "../../../models/user-model";
import { getRequestUser } from "../../../lib/request-user";

const handlers = {
  GET: async (req, res) => {
    const levelModel = new LevelModel();
    const { levelId } = req.query;
    const currentUser = await getRequestUser(req);
    if (!levelId) {
      res
        .status(400)
        .send(`Either levelId is missing from request query or is Invalid`);
      return;
    }
    // TODO check if user has access to the below level
    console.log(`Getting level ${levelId} for ${currentUser.email}`);
    /** extract the user's, statistics */
    const userModel = new UserModel();

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

    let level = await JSON.parse(
      await levelModel.getLevel(levelQuery, levelProjection)
    );

    level = level?.[0];

    /** check if user has access to the below level */
    const hasUserUnlockedLevel = userModel.hasUserUnlockedLevel(
      currentUser,
      levelId
    );
    const isLevelUnlocked = levelModel.isLevelUnlocked(level);
    const isLevelValid = hasUserUnlockedLevel || isLevelUnlocked;

    /** if level is invalid throw custom error */
    if (!isLevelValid) {
      res
        .status(401)
        .send(`Forbidden access. Please unlock the level and try again`);
      return;
    }

    /** hide hints which are not unlocked */
    level.hints = levelModel.processHints(level);

    res.status(200).json(level);
  }
};

export default async function Level(req, res) {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
