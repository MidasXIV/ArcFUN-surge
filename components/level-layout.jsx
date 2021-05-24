import Head from "next/head";
import Header from "./header";

const LevelLayout = ({ children, title }) => (
  <div className="flex flex-col h-screen">
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <main className="flex-1">
      <div className="w-full h-full py-4">{children}</div>
    </main>
  </div>
);

export default LevelLayout;
