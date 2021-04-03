/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { connectToDatabase } from "../lib/mongodb";
import Level from "../schemas/level-schema";

export default class LeveLModel {
  async getLevelIDs() {
    console.log(`Fetching Level IDs`);
    const { client, db } = await connectToDatabase();
    const isConnected = await client.isConnected();
    console.log(`MogoDB isConnected :: ${isConnected}`);
    const levelIDs = await db
      .collection("levels")
      .find()
      .map((x) => x._id)
      .toArray();
      console.log(levelIDs);
    return JSON.stringify(levelIDs);
  }

  async createLevel(LevelProps) {
    console.log(`creating new Level: ${LevelProps}`);
    const { client, db } = await connectToDatabase();
    const isConnected = await client.isConnected();
    console.log(`MogoDB isConnected :: ${isConnected}`);
    return Level.create({ ...LevelProps });
  }
}
