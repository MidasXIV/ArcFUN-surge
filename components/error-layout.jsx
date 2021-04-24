import Head from "next/head";
import Header from "./header";

const ErrorLayout = ({ children, title }) => (
  <div className="flex flex-col h-screen">
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="absolute right-0 top-0">
      <Header />
    </div>
    <main className="m-0 p-0">
      <div>{children}</div>
    </main>
  </div>
);

/**
 * Usage
 * <ErrorLayout title="ArcFUN | Levels">
 *    <Error statusCode={403} title="Please login to access this page" />
 * </ErrorLayout>
 */

export default ErrorLayout;
