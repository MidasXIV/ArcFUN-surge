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

    levels = levelModel.processLayer(levels);
    // extract just the name,unlocksAt and the hints.
    // Should check whether a specific level or all levels
    // Extract which levels the user has unlocked.

    // const { token } = await getSession(req)
    // const todoModel = new TodoModel(token)
    // const todo = await todoModel.getTodo(req.query.id)
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
