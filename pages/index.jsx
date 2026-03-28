import { useUser } from "../hooks/user";
import { connectToDatabase } from "../lib/mongodb";
import Layout from "../components/layout";
import RulesPanel from "../components/rules-panel";
import DashboardPanel from "../components/dashboard-panel";

export async function getServerSideProps() {
  let isConnected = false;

  try {
    const { connection } = await connectToDatabase();
    isConnected = connection?.readyState === 1;
  } catch (error) {
    console.error("Failed to connect to MongoDB for home page:", error.message);
  }

  return {
    props: { isConnected }
  };
}

const Home = ({ isConnected }) => {
  const user = useUser();
  return (
    <Layout title="Surge | Dashboard">
      {user && <DashboardPanel user={user} isConnected={isConnected} />}

      <h1 className="pb-2 text-4xl font-semibold text-gray-900 leading-none">
        Rules
      </h1>

      <p />

      <RulesPanel />
    </Layout>
  );
};

export default Home;
