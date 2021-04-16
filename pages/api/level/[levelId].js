import createHandlers from "../../../lib/rest-utils";
import LevelModel from "../../../models/level-model";
import { getSession } from "../../../lib/auth-cookies";

const handlers = {
  GET: async (req, res) => {
    const levelModel = new LevelModel();
    const { levelId } = req.query;
    const { email } = await getSession(req);
    // if no session throw unauthorised error
    console.log(`Getting level ${levelId} for ${email}`);

    const levelQuery = {
      _id: levelId
    };
    // extract just the name,unlocksAt and the hints.
    const levelProjection = {
      name: true,
      unlocksAt: true,
      hints: {
        unlocksAt: true
      }
    };

    let level = await JSON.parse(
      await levelModel.getLevel(levelQuery, levelProjection)
    );

    // TODO: Extract which levels the user has unlocked.
    level = levelModel.processLayer(level);

    res.status(200).json({ level });
  }
};

export default async function Level(req, res) {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
