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

  async getUsers(query = {}, projection = {}) {
    const { db } = await connectToDatabase();
    const user = await User.find(query, projection);
    return JSON.stringify(user) ?? undefined;
  }

  async getUser(query = {}, projection = {}) {
    const { db } = await connectToDatabase();
    const user = await User.findOne(query, projection);
    return JSON.stringify(user) ?? undefined;
  }

  getLevelsUnlocked(user) {
    const { statistics } = user;
    const levels = statistics.map((statistic) => statistic.levelId);
    return levels;
  }

  getLevelsSolved(user) {
    const { statistics } = user;
    const levels = statistics
      .filter((statistic) => Boolean(statistic.solvedAt))
      .map((statistic) => statistic.levelId);
    return levels;
  }

  getLevelProfile(user, levelId) {
    const { statistics } = user;
    return statistics.find((statistic) => levelId === statistic.levelId);
  }

  updateLevelProfile(statistics, levelProfile) {
    const statsWithoutLevel = statistics.filter(
      (statistic) => levelProfile.levelId !== statistic.levelId
    );
    return [...statsWithoutLevel, levelProfile];
  }

  async updateUser(filter, update) {
    await User.findOneAndUpdate(filter, update);
  }

  hasUserUnlockedLevel(user, levelId) {
    const levelsUnlocked = this.getLevelsUnlocked(user);
    return levelsUnlocked.includes(levelId);
  }
}
