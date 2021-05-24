import { useState } from "react";
import Error from "next/error";
import { useAlert } from "react-alert";
import { useLevel } from "../../hooks/level";

import LevelModel from "../../models/level-model";
import LevelLayout from "../../components/level-layout";
import Gallery from "../../components/gallery";
import HintsPanel from "../../components/hints-panel";
import SolutionInput from "../../components/solution-input";
import ErrorLayout from "../../components/error-layout";

const defaultLevelProps = {
  name: "Level",
  items: [],
  hints: []
};

const Level = ({ level }) => {
  // const user = useUser({ redirectTo: "/login" });
  const alert = useAlert();
  const { levelData, error } = useLevel({
    levelId: level.id,
    redirectTo: "/login",
    redirectIfUnauthorized: true
  });

  const { hints, gallery, name } = levelData ?? defaultLevelProps;

  const [input, setInput] = useState("");

  async function handleChange(e) {
    setInput(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    /** since the layout is flashed there's a
     * chance of user clicking the submit button
     */

    alert.show(`Finding out if ${input} is the right soultion!`);

    const body = {
      levelId: level.id,
      solution: input
    };

    try {
      const res = await fetch("/api/solution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      // will return
      // 400 - when body not set properly,
      // 403 - is not authenticated,
      // 401 - if level is not unlocked by user,
      // 200 -> status / message if wrong / completed / correct solution

      if (res.status === 200) {
        const { status, message } = await res.json();
        switch (status) {
          case "fail":
          case "completed":
            alert.error(message);
            break;
          case "correct":
            alert.success(message);
            break;
          default:
            break;
        }
      }
    } catch (_err) {
      console.error("An unexpected error happened occurred:", _err);
      alert.error(_err.message);
    }

    /** make request to API */
    /** load some kind of indicator to show success or request */
  };

  if (error) {
    return (
      <ErrorLayout title="ArcFUN | Levels">
        <Error statusCode={error.status} title={error.info} />
      </ErrorLayout>
    );
  }

  return (
    <LevelLayout title={`Surge | ${name}`}>
      <div className="flex flex-col h-full md:flex-row justify-end px-2 md:space-x-3">
        <div className="px-8 w-full md:w-2/3 lg:w-3/4 flex justify-center">
          <div className="flex flex-col max-w-2xl">
            <Gallery items={gallery} />
            <SolutionInput
              value={input}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
        <HintsPanel hints={hints} />
      </div>
    </LevelLayout>
  );
};

export async function getStaticPaths() {
  // Make DB queries directly as this is not bundled in frontend
  const levelModel = new LevelModel();
  const levels = await JSON.parse(await levelModel.getLevelIDs());

  // Get the paths we want to pre-render based on levels
  // params object has the id of the level, level keyword should be present
  // as we use [level].jsx
  const paths = levels.map((level) => ({
    params: { level }
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { level: { state: "loading", id: params.level } } };
}

export default Level;

/**
 * Update level API to not return level data if unauthorized
 * Handle showing and hiding banner
 */
