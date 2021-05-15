import { useLevels } from "../../hooks/levels";
import Layout from "../../components/layout";
import LevelCard from "../../components/level-card";

const Level = () => {
  const levels = useLevels({
    redirectTo: "/login",
    redirectIfUnauthorized: true
  });

  // if (!levels) {
  //   return (
  //     <ErrorLayout title="ArcFUN | Levels">
  //       <Error statusCode={403} title="Please login to access this page" />
  //     </ErrorLayout>
  //   );
  // }

  const levelCards =
    levels && levels.map((level) => <LevelCard key={level.id} {...level} />);

  const levelCardsLoading = new Array(9)
    .fill(0)
    // eslint-disable-next-line react/no-array-index-key
    .map((level, idx) => <LevelCard key={`level-${idx}`} state="loading" />);

  return (
    <Layout title="Surge | Levels">
      <div className="flex flex-col justify-center items-center space-y-2 sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 md:grid-cols-4 ml-2 pt-4">
        {levels ? levelCards : levelCardsLoading}
      </div>
    </Layout>
  );
};

export default Level;
