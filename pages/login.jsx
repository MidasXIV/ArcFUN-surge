import { useState } from "react";
import Router from "next/router";
import { Magic } from "magic-sdk";
import { useUser } from "../hooks/user";
import Layout from "../components/layout";
import Form from "../components/form";

const Login = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      email: e.currentTarget.email.value
    };

    try {
      /* Step 4.1: Create instance of MAgic using PUBLISHABLE KEY */
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);

      /* Step 4.2: Generate a DID (decentralized identifier) token with Magic */
      const didToken = await magic.auth.loginWithMagicLink({
        email: body.email
      });

      /* Step 4.6: Make POST request to /api/login */
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${didToken}`
        },
        body: JSON.stringify(body)
      });

      /* Step 4.7: If Successful redirect to Home page */
      if (res.status === 200) {
        Router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return (
    <Layout title="Surge | Login">
      <div className="flex min-h-screen container rounded-lg">
        <img
          className="w-1/2 h-full bg-cover md:block hidden rounded-lg object-cover my-6"
          alt="hero"
          src="https://cdn.dribbble.com/users/13754/screenshots/10285382/media/d8977cc25cdbf7e3915e9ae37509b394.png?compress=1&resize=1200x900"
        />

        <div className="md:w-1/2 max-w-lg mx-auto my-5 px-4 py-5 shadow-none">
          <div className="text-left p-0 font-sans">
            <h1 className="text-gray-800 font-medium text-5xl">
              Welcome to ArcFUN <span className="text-blue-500">Surge</span>
            </h1>
            <h3 className="p-1 text-gray-600 text-sm mt-2">
              Pit your wits against each other and solve a series of deviously
              difficut puzzles with clues being scattered accross the internet.
            </h3>
          </div>
          <Form errorMessage={errorMsg} onSubmit={handleSubmit} />

          <section className="bg-black font-sans text-xs text-gray-400 rounded-xl py-4 px-5 m-2">
            <h6 className="text-gray-100 font-medium text-lg mb-2">
              Cookies... Yum...
            </h6>
            You do not need a password to sign-up for this site.
            <br />
            We use cookies to keep you logged in and deliver a seamless and
            personalized experience!
          </section>

          <a className="" href="/login" data-test="Link">
            <span className="block  p-5 text-center text-gray-800 text-xs">
              15+ puzzle wizards have joined us, now it&apos;s your turn.
            </span>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
