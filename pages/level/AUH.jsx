import { useRef, useEffect } from "react";
import Layout from "../../components/layout";

const AUH = () => {
  const dot = useRef(null);

  const printImage = (url) => {
    console.log(
      "%c ",
      "font-size:400px; backdround-size: contain;" +
        `background:url(${url}) no-repeat;`
    );
  };

  useEffect(() => {
    const onClick = () => {
      if (typeof window !== "undefined") {
        const { href } = window.location;
        console.log(`Path:: ${href}`);
        printImage(
          "https://user-images.githubusercontent.com/24829816/124516724-5f43c380-ddf3-11eb-88dc-3294e29afbf2.png"
        );
      }
    };

    if (dot && dot.current) {
      dot.current.addEventListener("click", onClick);
    }

    return () => {
      dot.current.removeEventListener(onClick);
    };
  });

  return (
    <Layout title="Surge | AUH">
      <div className="mx-auto max-w-md font-black text-5xl">
        <p>
          Only the most intelligent advance forward
          <span ref={dot}>.</span>
        </p>
        <p className="mt-10 text-xl font-mono text-white">
          Mdi ahrvwa xahc absw ehrtq amrh mv ky vqihizxlgmq, rha sofx wewpnqfmq.
          Qnzc qr eeh fr vwcprvibwef ?
        </p>
      </div>
    </Layout>
  );
};

export default AUH;
