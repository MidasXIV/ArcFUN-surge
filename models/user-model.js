/* eslint-disable class-methods-use-this */
import User from "../schemas/user-schema";
import { connectToDatabase } from "../lib/mongodb";

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

  async getUser(query = {}, projection = {}) {
    const { db } = await connectToDatabase();
    const user = await User.find(query, projection);
    return JSON.stringify(user[0]) ?? undefined;
  }

  getLevelsUnlocked(user) {
    const { statistics } = user;
    const levels = statistics.map((statistic) => statistic.levelId);
    return levels;
  }

  hasUserUnlockedLevel(user, levelId) {
    const levelsUnlocked = this.getLevelsUnlocked(user);
    return levelsUnlocked.includes(levelId);
  }
}
