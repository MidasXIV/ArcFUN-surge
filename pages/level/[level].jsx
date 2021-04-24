import { useState } from "react";
import { useUser } from "../../hooks/user";
import { useLevel } from "../../hooks/level";

import LevelModel from "../../models/level-model";
import LevelLayout from "../../components/level-layout";
import Gallery from "../../components/gallery";
import HintsPanel from "../../components/hints-panel";
import SolutionInput from "../../components/solution-input";

const defaultLevelProps = {
  items: [],
  hints: []
};

const Level = ({ level }) => {
  const user = useUser({ redirectTo: "/login" });
  const levelData = useLevel({
    levelId: level.id,
    redirectTo: "/login",
    redirectIfUnauthorized: true
  });

  const { hints, gallery } = levelData ?? defaultLevelProps;

  const [input, setInput] = useState("");

  async function handleChange(e) {
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `${user.email} tried to submit solution ${input} to level :: ${level.id}`
    );
  };

  // Do Authentication and Authorization here.
  return (
    <LevelLayout title="ArcFUN | Levels">
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
