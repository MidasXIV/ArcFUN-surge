import { magic } from "../../../lib/magic";
import LevelModel from "../../../models/user-model";

export default async function getLevelPaths(req, res) {
  try {
    if (req.method !== "GET") return res.status(405).end();

    /* Step 1: Authenticate the User */
    const didToken = req.headers.authorization.substr(7);
    const metadata = await magic.users.getMetadataByToken(didToken);
    const session = { ...metadata };
    const { email } = metadata;

    console.log(email);

    const levelModel = new LevelModel();
    const levelIDs = levelModel.getLevelIDs();
    res.status(200).send({ levels: levelIDs });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
