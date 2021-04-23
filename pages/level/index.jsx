import { useUser } from "../../hooks/user";
import { useLevels } from "../../hooks/levels";
import Layout from "../../components/layout";
import LevelCard from "../../components/level-card";

const Level = () => {
  const card1Props = {
    title: "Level 111",
    summary: "Unlocked at 2:30 PM",
    state: "",
    hintsUnlocked: 2
  };
  const user = useUser({ redirectTo: "/login" });
  const levels = useLevels();
  console.log(levels);
  const steps = {
    step1:
      "get all Level info (CSR) using hooks -> when the level will be unlocked; how many hint's are unlocked.",
    step2: "get users stats like levels completed.",
    step3: "combine the two.",
    step4: "clicking on the link should allow us to go to that level."
  };

  const levelCards =
    levels && levels.map((level) => <LevelCard key={level.id} {...level} />);

  return (
    <Layout title="ArcFUN | Levels">
      {/* <pre>{JSON.stringify(steps, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(levels, null, 2)}</pre> */}
      <div className="flex flex-col justify-center items-center space-y-2 sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 md:grid-cols-4 ml-2 pt-4">
        <LevelCard {...card1Props} />
        <LevelCard {...card1Props} hintsUnlocked={3} />
        <LevelCard {...card1Props} state="loading" />
        <LevelCard {...card1Props} state="loading" />
        <LevelCard {...card1Props} />
        <LevelCard {...card1Props} hintsUnlocked={1} />
        <LevelCard {...card1Props} state="loading" />
        <LevelCard {...card1Props} state="completed" />
        <LevelCard {...card1Props} state="disabled" />
        {levelCards}
      </div>
    </Layout>
  );
};

export default Level;
