/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { connectToDatabase } from "../lib/mongodb";

export default class LeveLModel {
  async getLevelIDs() {
    console.log(`Fetching Level IDs`);
    const { client, db } = await connectToDatabase();
    const isConnected = await client.isConnected();
    console.log(`MogoDB isConnected :: ${isConnected}`);
    const levelIDs = await db
      .collection("levels")
      .find()
      .map((x) => x.id)
      .toArray();
    return JSON.stringify(levelIDs);
  }
}
