import { useUser } from "../hooks/user";
import { connectToDatabase } from "../lib/mongodb";
import Layout from "../components/layout";
import RulesPanel from "../components/rules-panel";
import DashboardPanel from "../components/dashboard-panel";

export async function getServerSideProps() {
  const { client } = await connectToDatabase();
  const isConnected = await client.isConnected();

  return {
    props: { isConnected }
  };
}

const Home = ({ isConnected }) => {
  const user = useUser();
  return (
    <Layout title="Surge | Dashboard">
      {user ? (
        <DashboardPanel user={user} isConnected={isConnected} />
      ) : (
        <div className="text-6xl pb-4 font-semibold text-gray-900 leading-none">
          Login to join the Fun!
        </div>
      )}

      <h1 className="pb-2 text-4xl font-semibold text-gray-900 leading-none">
        Rules
      </h1>

      <p />

      <RulesPanel />
    </Layout>
  );
};

export default Home;
