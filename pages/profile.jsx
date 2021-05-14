import { useUser } from "../hooks/user";
import Layout from "../components/layout";

const Profile = () => {
  const user = useUser({ redirectTo: "/login" });

  return (
    <Layout title="Surge | Profile">
      <h1>Profile</h1>
      {user && (
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
};

export default Profile;
