import createHandlers from "../../../lib/rest-utils";
import LevelModel from "../../../models/level-model";
import { getSession } from "../../../lib/auth-cookies";

const handlers = {
  GET: async (req, res) => {
    const levelModel = new LevelModel();
    const { email } = await getSession(req);
    // if no session throw unauthorised error
    console.log(`Getting All levels for ${email}`);
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
    levels = levelModel.processLayer(levels);

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
