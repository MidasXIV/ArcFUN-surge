import User from "../models/user-model";
import { connectToDatabase } from "./mongodb";

export default class UserModel {
  async createUser(email) {
    console.log(`creating new User: ${email}`);
    const { db } = await connectToDatabase();

    return User.create({ email });
  }

  async getUserByEmail(email) {
    try {
      const { db } = await connectToDatabase();
      const user = User.findOne({ email });

      if (!user) {
        throw new Error("No user found");
      }
      return user;
    } catch (err) {
      return undefined;
    }
  }

  async obtainFaunaDBToken(user) {
    return adminClient
      .query(q.Create(q.Tokens(), { instance: q.Select("ref", user) }))
      .then((res) => res?.secret)
      .catch(() => undefined);
  }

  async invalidateFaunaDBToken(token) {
    await getClient(token).query(q.Logout(true));
  }
}
