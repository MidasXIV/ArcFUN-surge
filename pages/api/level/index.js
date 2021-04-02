import LevelModel from "../../../models/level-model";

export default async function Level(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).end();
    const levelModel = new LevelModel();
    const level = await levelModel.createLevel(req.body);
    console.log(level);

    res.status(200).send({
      done: true
    });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
