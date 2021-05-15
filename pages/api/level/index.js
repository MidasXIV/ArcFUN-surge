import createHandlers from "../../../lib/rest-utils";
import LevelModel from "../../../models/level-model";
import UserModel from "../../../models/user-model";
import { getSession } from "../../../lib/auth-cookies";

const handlers = {
  GET: async (req, res) => {
    const levelModel = new LevelModel();
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

    // Get all levels user has unlocked
    const levelsUnlockedByUser = userModel.getLevelsUnlocked(user);
    const levelsSolvedByUser = userModel.getLevelsSolved(user);

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
    const { email } = await getSession(req);
    const level = await levelModel.createLevel(req.body);
    const { _id } = level;
    console.log(`New level created by ${email} :: ${_id}`);
    res.status(200).json({ _id });
  }
};

export default async function Level(req, res) {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
