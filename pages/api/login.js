import { magic } from "../../lib/magic";
import { encryptSession } from "../../lib/iron";
import { setTokenCookie } from "../../lib/auth-cookies";
import UserModel from "../../models/user-model";

export default async function login(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).end();

    /* Step 4.3: Validate the user's DID token */
    const didToken = req.headers.authorization.substr(7);
    const metadata = await magic.users.getMetadataByToken(didToken);
    const session = { ...metadata };
    const { email } = metadata;

    console.log(email);

    /* Step 4.4: Get or create a user's entity in MongoDB */

    const userModel = new UserModel();
    // We auto-detect signups if `getUserByEmail` resolves to `undefined`
    const user =
      (await userModel.getUserByEmail(email)) ??
      (await userModel.createUser(email));
    console.log(user);
    // const token = await userModel.obtainFaunaDBToken(user);

    // Once we have the user's verified information, we can create
    // a session cookie!

    /* Step 4.5: Create Encrypted Session using Iron and Set Cookie */
    // The token is a string with the encrypted session
    const token = await encryptSession(session);
    setTokenCookie(res, token);

    res.status(200).send({ done: true });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
