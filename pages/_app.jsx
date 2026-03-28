import "../styles/index.css";
import { AlertProvider } from "../components/alert-provider";

function MyApp({ Component, pageProps }) {
  return (
    <AlertProvider>
      <Component {...pageProps} />
    </AlertProvider>
  );
}

export default MyApp;
