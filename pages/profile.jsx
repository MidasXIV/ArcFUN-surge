import cn from "classnames";
import { useUser } from "../hooks/user";
import Layout from "../components/layout";
import { connectToDatabase } from "../lib/mongodb";
import { isLevelCompleted, isLevelUnlocked } from "../lib/user-stats";
import getRanks from "../lib/rank-algorithm";
import UserModel from "../models/user-model";
import LevelModel from "../models/level-model";

export async function getServerSideProps() {
  const { client } = await connectToDatabase();
  const isConnected = await client.isConnected();

  /** get all users */
  const userModel = new UserModel();
  const userQuery = {};
  const userProjection = {
    _id: true,
    email: true,
    statistics: true
  };

  const users = await JSON.parse(
    await userModel.getUsers(userQuery, userProjection)
  );

  /** get all levels */
  const levelModel = new LevelModel();
  const levelQuery = {};
  const levelProjection = {
    _id: true,
    unlocksAt: true,
    hints: true
  };

  const levels = await JSON.parse(
    await levelModel.getLevel(levelQuery, levelProjection)
  );

  const ranks = getRanks(users, levels);
  const levelStatus = levelModel.getLevelsStatus(levels);

  console.log(levelStatus);
  return {
    props: { isConnected, ranks, levelStatus }
  };
}

const RankCard = ({ isLoading = false, rank, user, levelStatus }) => (
  <div className="bg-white w-full flex font-mono items-start p-2 rounded-xl shadow border max-w-sm cursor-pointer">
    <div className="py-1">
      <img
        alt="avatar"
        className="bg-black border-2 border-black rounded-xl max-h-24"
        src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFrida&accessoriesType=Prescription01&facialHairType=BeardLight&facialHairColor=Brown&clotheType=Hoodie&clotheColor=Gray02&eyeType=Side&eyebrowType=FlatNatural&mouthType=Concerned&skinColor=Pale"
      />
    </div>
    <div className="flex-grow px-3 py-1">
      <h3 className="text-2xl px-1 font-black text-gray-700 capitalize">
        {rank}
      </h3>
      <p className="text-lg px-1 text-gray-500">{user.email}</p>
      <hr />
      <p className="text-lg px-1 text-gray-500">POINTS :: {user.points}</p>
      <hr />
      <div className="p-2 grid grid-cols-5 gap-y-1 gap-x-0">
        {levelStatus.map((level) => {
          const isLevelCompletedByUser = isLevelCompleted(level.levelId, user);
          const isLevelUnlockedByUser = isLevelUnlocked(level.levelId, user);
          const isLevelUnlockedByTime = level.state === "unlocked";
          const isLevelLocked = level.state === "locked";
          return (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={`hint-bubble-${level.levelId}`}
              className={cn("block h-3 w-3 rounded-full", {
                "bg-gray-400 animate-pulse": isLoading,
                "bg-green-400": !isLoading && isLevelCompletedByUser,
                "bg-yellow-400": !isLoading && !isLevelCompletedByUser && isLevelUnlockedByUser,
                "bg-red-400": !isLoading && isLevelLocked,
                "bg-blue-400": !isLoading && !isLevelCompletedByUser && isLevelUnlockedByTime
              })}
            />
          );
        })}
      </div>
    </div>
  </div>
);

const Profile = ({ ranks, levelStatus }) => {
  const user = useUser({ redirectTo: "/login" });

  return (
    <Layout title="Surge | Profile">
      <h1>Profile</h1>
      {ranks.map((rank, idx) => (
        <RankCard
          user={rank}
          rank={`RANK ${idx + 1}`}
          // eslint-disable-next-line no-underscore-dangle
          key={rank._id}
          levelStatus={levelStatus}
        />
      ))}
      {/* <RankCard /> */}
      {/* {user && (
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <pre>{JSON.stringify(ranks, null, 2)}</pre>
        </>
      )} */}
    </Layout>
  );
};

export default Profile;
