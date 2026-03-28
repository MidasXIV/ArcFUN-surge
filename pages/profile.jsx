import { useUser } from "../hooks/user";
import Layout from "../components/layout";
import RankCard from "../components/rank-card";
import LevelStatisticsTable from "../components/level-statistics-table";
import { connectToDatabase } from "../lib/mongodb";
import getRanks from "../lib/rank-algorithm";
import UserModel from "../models/user-model";
import LevelModel from "../models/level-model";

export async function getServerSideProps() {
  let isConnected = false;
  let ranks = [];
  let levelStatus = [];

  try {
    const { connection } = await connectToDatabase();
    isConnected = connection?.readyState === 1;

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

    ranks = getRanks(users, levels);
    levelStatus = levelModel.getLevelsStatus(levels);

    console.log(levelStatus);
  } catch (error) {
    console.error("Failed to load profile data:", error.message);
  }

  return {
    props: { isConnected, ranks, levelStatus }
  };
}

const Profile = ({ ranks, levelStatus }) => {
  const user = useUser();
  const currentRank = user ? ranks.find((rank) => rank.email === user.email) : null;

  return (
    <Layout title="Surge | Profile">
      {currentRank ? (
        <section className="my-4 p-4 bg-black rounded-lg">
          <h1 className="text-4xl pb-4 font-semibold text-gray-200 leading-none">
            Profile
          </h1>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
          <LevelStatisticsTable user={currentRank} />
        </section>
      ) : (
        <section className="my-4 p-4 bg-black rounded-lg text-gray-200">
          Guest mode is enabled. Ranking is visible, but personal progress is not tracked.
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
