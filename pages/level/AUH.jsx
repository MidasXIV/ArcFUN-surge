import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

const AUH = () => {
  const dot = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const onClick = () => {
      if (typeof window !== "undefined") {
        const { hostname } = window.location;
        console.log(`Path:: ${hostname}`);
      }
      console.log(`Path:: ${router.basePath}/${router.pathname}`);
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
