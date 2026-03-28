import Link from "next/link";
import Layout from "../components/layout";

const Login = () => {
  return (
    <Layout title="Surge | Guest Mode">
      <div className="flex min-h-screen container rounded-lg">
        <img
          className="w-1/2 h-full bg-cover md:block hidden rounded-lg object-cover my-6"
          alt="hero"
          src="https://cdn.dribbble.com/users/13754/screenshots/10285382/media/d8977cc25cdbf7e3915e9ae37509b394.png?compress=1&resize=1200x900"
        />

        <div className="md:w-1/2 max-w-lg mx-auto my-5 px-4 py-5 shadow-none">
          <div className="text-left p-0 font-sans">
            <h1 className="text-gray-800 font-medium text-5xl">
              ArcFUN <span className="text-blue-500">Surge</span> is public
            </h1>
            <h3 className="p-1 text-gray-600 text-sm mt-2">
              Authentication has been disabled, so you can browse the cases and
              solve currently unlocked levels without signing in.
            </h3>
          </div>

          <section className="bg-black font-sans text-xs text-gray-400 rounded-xl py-4 px-5 m-2">
            <h6 className="text-gray-100 font-medium text-lg mb-2">
              Guest mode
            </h6>
            Personal progress is not saved unless you wire a user identity back
            into the APIs.
            <br />
            The leaderboard still renders from existing stored users.
          </section>

          <Link href="/level">
            <a className="block p-5 text-center text-gray-800 text-xs" data-test="Link">
              Open the cases.
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
