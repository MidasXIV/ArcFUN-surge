// import LevelModel from "../models/level-model";
import { useState } from "react";
import LevelLayout from "../components/level-layout";
import Gallery from "../components/gallery";
import HintsPanel from "../components/hints-panel";
import SolutionInput from "../components/solution-input";

const formatDate = (date) => {
  return new Date(date).toISOString();
};

const GalleryProps = {
  items: [
    // {
    //   order: 2,
    //   alt: "taxi driver",
    //   src:
    //     "https://user-images.githubusercontent.com/24829816/107695103-93460d00-6cc9-11eb-9625-9ac3bbf65ba1.png"
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
    {
      order: 1,
      alt: "pikachu",
      src:
        "https://user-images.githubusercontent.com/24829816/107820906-07011c00-6d95-11eb-983c-b64ad300763e.png"
    }
  ]
};

const HintProps = {
  hints: [
    {
      description: "look within!",
      unlocksAt: formatDate("2021-04-08T13:00")
    },
    {
      description: "notepad!",
      unlocksAt: formatDate("2021-04-08T16:00")
    },
    {
      description: "follow the arrows",
      unlocksAt: formatDate("2021-04-08T19:00")
    }
  ]
};

const LevelProps = {
  name: "Pikachuuu",
  unlocksAt: formatDate("2021-09-02T10:00"),
  solution: "Vivaldi"
};

const Builder = (props) => {
  console.log(props);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      name: LevelProps.name,
      solution: LevelProps.solution,
      unlocksAt: LevelProps.unlocksAt,
      gallery: GalleryProps.items,
      hints: HintProps.hints
    };

    alert(`A Level was submitted: ${JSON.stringify(body)}`);

    try {
      /* Step 4.6: Make POST request to /api/login */
      const res = await fetch("/api/level", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      /* Step 4.7: If Successful redirect to Home page */
      if (res.status === 200) {
        // Router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }

  const [input, setInput] = useState(LevelProps.solution);

  async function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <LevelLayout title="ArcFUN | Builder">
      <div className="flex flex-col h-full md:flex-row justify-end px-2 md:space-x-3">
        <div className="px-8 w-full md:w-2/3 lg:w-3/4 flex justify-center">
          <div className="flex flex-col max-w-2xl">
            <Gallery {...GalleryProps} />
            <SolutionInput
              onChange={handleChange}
              value={input}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
        <HintsPanel {...HintProps} />
      </div>
    </LevelLayout>
  );
};

export default Builder;
