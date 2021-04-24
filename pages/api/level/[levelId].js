import createHandlers from "../../../lib/rest-utils";
import LevelModel from "../../../models/level-model";
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
    // TODO check if user has access to the below level
    console.log(`Getting level ${levelId} for ${email}`);

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

    // TODO: Extract which levels the user has unlocked.
    // Filter out level descriptions which are not unlocked
    // level = levelModel.processLayer(level);

    res.status(200).json({ ...level[0] });
  }
};

export default async function Level(req, res) {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
