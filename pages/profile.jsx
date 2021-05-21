import { useUser } from "../hooks/user";
import Layout from "../components/layout";
import RankCard from "../components/rank-card";
import LevelStatisticsTable from "../components/level-statistics-table";
import { connectToDatabase } from "../lib/mongodb";
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

const Profile = ({ ranks, levelStatus }) => {
  // const user = useUser({ redirectTo: "/login" });
  const user = useUser();

  return (
    <Layout title="Surge | Profile">
      {user && (
        <section className="my-4 p-4 bg-black rounded-lg">
          <h1 className="text-4xl pb-4 font-semibold text-gray-200 leading-none">
            Profile
          </h1>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
          <LevelStatisticsTable
            user={ranks.find((rank) => rank.email === user.email)}
          />
        </section>
      )}
      <h1 className="text-4xl pb-4 font-semibold text-gray-900 leading-none">
        Rank
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-3">
        {ranks.map((rank, idx) => (
          <RankCard
            user={rank}
            rank={`RANK ${idx + 1}`}
            // eslint-disable-next-line no-underscore-dangle
            key={rank._id}
            levelStatus={levelStatus}
          />
        ))}
      </section>
    </Layout>
  );
};

export default Profile;
