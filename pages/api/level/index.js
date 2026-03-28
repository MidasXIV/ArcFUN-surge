import createHandlers from "../../../lib/rest-utils";
import LevelModel from "../../../models/level-model";
import UserModel from "../../../models/user-model";
import { getRequestUser } from "../../../lib/request-user";

const handlers = {
  GET: async (req, res) => {
    const levelModel = new LevelModel();
    const currentUser = await getRequestUser(req);

    /** extract the user's, statistics */
    const userModel = new UserModel();
    // Get all levels user has unlocked
    const levelsUnlockedByUser = userModel.getLevelsUnlocked(currentUser);
    const levelsSolvedByUser = userModel.getLevelsSolved(currentUser);

    const levelQuery = {}; // since we want all level query object is empty.
    // extract just the name,unlocksAt and the hints.
    const levelProjection = {
      name: true,
      unlocksAt: true,
      hints: {
        unlocksAt: true
      }
    };
    let levels = await JSON.parse(
      await levelModel.getLevel(levelQuery, levelProjection)
    );

    // TODO: Extract which levels the user has unlocked.
    levels = levelModel.processLayer(
      levels,
      levelsUnlockedByUser,
      levelsSolvedByUser
    );

    res.status(200).json({ levels });
  },

  POST: async (req, res) => {
    const levelModel = new LevelModel();
    const currentUser = await getRequestUser(req, { email: true });
    const level = await levelModel.createLevel(req.body);
    const { _id } = level;
    console.log(`New level created by ${currentUser.email} :: ${_id}`);
    res.status(200).json({ _id });
  }
};

export default async function Level(req, res) {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
