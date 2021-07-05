import { useRef, useEffect } from "react";
import Layout from "../../components/layout";

const AUH = () => {
  const dot = useRef(null);
  const wordSplit = [500, 500, 500, 500];
  const morseDash = 300;
  const morseDot = 100;
  const morseCode = [
    ...wordSplit,
    morseDash,
    ...wordSplit,
    morseDot,
    morseDash + morseDash,
    ...wordSplit,
    morseDot,
    ...wordSplit,
    morseDash,
    morseDot,
    ...wordSplit,
    morseDash,
    ...wordSplit,
    morseDash,
    morseDot,
    morseDash + morseDash,
    ...wordSplit,
    morseDash, // vibrates
    morseDot,
    ...wordSplit,
    morseDot + morseDot,
    ...wordSplit,
    morseDash,
    morseDot,
    ...wordSplit,
    morseDot,
    ...wordSplit,
    morseDash,
    ...wordSplit,
    morseDot + morseDot + morseDot + morseDot,
    ...wordSplit,
    morseDot,
    morseDash + morseDash + morseDash,
    ...wordSplit,
    morseDot + morseDot,
    morseDash,
    ...wordSplit,
    morseDash,
    morseDot,
    ...wordSplit,
    morseDot,
    ...wordSplit
  ];

  const printImage = (url) => {
    console.log(
      "%c ",
      "font-size:400px; backdround-size: contain;" +
        `background:url(${url}) no-repeat;`
    );
  };

  useEffect(() => {
    let vibrateInterval;
    // Stops vibration
    const stopVibrate = () => {
      // Clear interval and stop persistent vibrating
      if (vibrateInterval) clearInterval(vibrateInterval);
      navigator.vibrate(0);
    };

    // Starts vibration at passed in level
    const startVibrate = (duration) => {
      navigator.vibrate(duration);
    };

    // Start persistent vibration at given duration and interval
    // Assumes a number value is given
    const startPersistentVibrate = (duration, interval) => {
      vibrateInterval = setInterval(() => {
        startVibrate(duration);
      }, interval);
    };

    const onClick = () => {
      if (typeof window !== "undefined") {
        const { href } = window.location;
        console.log(`Path:: ${href}`);
        console.log("Please view on Chrome");
        printImage(
          "https://user-images.githubusercontent.com/24829816/124516724-5f43c380-ddf3-11eb-88dc-3294e29afbf2.png"
        );
      }

      startPersistentVibrate(morseCode, 15000);
    };

    if (dot && dot.current) {
      dot.current.addEventListener("click", onClick);
    }

    return () => {
      stopVibrate();
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
