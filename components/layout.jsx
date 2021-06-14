import Head from "next/head";
import Header from "./header";

const Layout = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <main>
      <div className="container w-full flex-grow py-4 px-8 mx-auto">
        {children}
      </div>
    </main>

    {/* <footer className="footer w-full p-2 h-12 flex justify-center items-center">
      <div className="bg-black text-white w-full rounded-lg shadow-lg">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" />
        </a>
      </div>
    </footer> */}

    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      }
    `}</style>
  </>
);

export default Layout;
