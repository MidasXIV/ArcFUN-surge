import { useUser } from "../../hooks/user";
import { useLevel } from "../../hooks/level";

import LevelModel from "../../models/level-model";
import LevelLayout from "../../components/level-layout";
import Gallery from "../../components/gallery";
import HintsPanel from "../../components/hints-panel";

const GalleryProps = {
  items: [
    // {
    //   order: 2,
    //   alt: "taxi driver",
    //   src:
    //     "https://user-images.githubusercontent.com/24829816/107695103-93460d00-6cc9-11eb-9625-9ac3bbf65ba1.png"
    // },
    // {
    //   order: 1,
    //   alt: "cumberbatch",
    //   src:
    //     "https://user-images.githubusercontent.com/24829816/107776440-0350a380-6d5b-11eb-89dd-c2711081ab30.png"
    // },
    // {
    //   order: 4,
    //   alt: "Todd",
    //   src:
    //     "https://user-images.githubusercontent.com/24829816/107821773-74fa1300-6d96-11eb-9619-bd20dfa8662b.png"
    // },
    // {
    //   order: 3,
    //   alt: "signal",
    //   src:
    //     "https://user-images.githubusercontent.com/24829816/107780180-c89d3a00-6d5f-11eb-8027-7f77c8f8de43.png"
    // },
    // {
    //   order: 1,
    //   alt: "pikachu",
    //   src:
    //     "https://user-images.githubusercontent.com/24829816/107820906-07011c00-6d95-11eb-983c-b64ad300763e.png"
    // }
  ]
};

const Level = ({ level }) => {
  const user = useUser({ redirectTo: "/login" });
  const levelData = useLevel({ levelId: level.id });
  if (levelData && levelData.gallery) {
    GalleryProps.items = levelData.gallery;
  }
  // Do Authentication and Authorization here.
  return (
    <LevelLayout title="ArcFUN | Levels">
      <div className="flex flex-col h-full md:flex-row justify-end px-2 md:space-x-3">
        {/* Begin Left Panel */}
        <div className="px-8 w-full md:w-2/3 lg:w-3/4 flex justify-center">
          <div className="flex flex-col max-w-2xl">
            {/* Begin Gallery Panel */}
            <Gallery {...GalleryProps} />
            {/* End Gallery */}
            {/* Begin Input */}
            <form className="mt-3 p-3 w-full flex mx-auto bg-black rounded-lg">
              <input
                type="text"
                className="p-4 rounded-lg text-gray-300 bg-black flex-1"
                placeholder="answer"
              />
              <button
                type="submit"
                className="bg-blue-400 text-white hover:bg-pink-600 transition-colors duration-500 cursor-pointer p-3 rounded-md text-sm font-medium icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    strokeWidth="1"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
            {/* End Input */}
          </div>
        </div>
        {/* Enf Left Panel */}

        <HintsPanel />
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
