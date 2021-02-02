import { useUser } from "../lib/hooks";
import { connectToDatabase } from "../lib/mongodb";
import Layout from "../components/layout";
import RulesPanel from "../components/rules-panel";
import DashboardPanel from "../components/dashboard-panel";

export async function getServerSideProps() {
  const { client, db } = await connectToDatabase();

  const isConnected = await client.isConnected();

  const listingsAndReviews = await db
    .collection("listingsAndReviews")
    .find()
    .sort({ _id: 1 })
    .limit(2)
    .toArray();
  console.log(
    listingsAndReviews.map((item) => ({
      name: item.name,
      summary: item.summary
    }))
  );

  return {
    props: { isConnected }
  };
}

const Home = ({ isConnected }) => {
  const user = useUser();
  return (
    <Layout>
      {user ? (
        <DashboardPanel user={user} />
      ) : (
        <div className="text-6xl pb-4 font-semibold text-gray-900 leading-none">
          Login to join the Fun!
        </div>
      )}

      {isConnected ? (
        <>
          <h2 className="font-mono">You are connected to MongoDB</h2>
          <div className="p-2 rounded-md bg-black w-min">
            <span className="block h-4 w-4 bg-green-400 rounded-full bottom-0 right-0" />
          </div>
        </>
      ) : (
        <h2 className="subtitle">Failure to connect to MongoDB.</h2>
      )}

      <h1 className="pb-2 text-4xl font-semibold text-gray-900 leading-none">
        Rules
      </h1>

      <p />

      <RulesPanel />

      {/* {user && (
        <>
          <p>Currently logged in as:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )} */}
    </Layout>
  );
};

export default Home;
