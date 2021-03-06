/* eslint-disable no-nested-ternary */
import cn from "classnames";
import Link from "next/link";

/**
 * Component takes in 3 state
 * if level is completed set state as "completed"
 * if level is locked set state as "disabled"
 * if level is unlocked but not completed set state as ""
 * if level is loading set state as "loading"
 */
const LevelCard = ({ id, title, summary, state, hintsUnlocked }) => {
  // console.log(title, summary, state, hintsUnlocked);
  const MAX_NUM_HINTS = 3;
  const isLoading = state === "loading";
  const isDisabled = state === "disabled";
  const isCompleted = state === "completed";
  return (
    <>
      <Link href={{ pathname: `/level/${id}` }}>
        <div className="bg-white w-full flex items-center p-2 rounded-xl shadow border max-w-sm cursor-pointer">
          <div className="flex-grow p-3">
            {!isLoading ? (
              <>
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                <p
                  className={cn("text-sm text-gray-500", {
                    "text-red-400 font-black": isDisabled,
                    "text-green-400 font-black": isCompleted
                  })}
                >
                  {summary}
                </p>
              </>
            ) : (
              <>
                <p className="bg-gray-700 text-lg animate-pulse h-4 w-1/4 mb-2" />
                <p className="bg-gray-500 text-sm animate-pulse h-4 w-3/5 mb-2" />
              </>
            )}
          </div>
          <div className="p-2 space-y-1">
            {isCompleted ? (
              <img
                className="w-12 h-12 opacity-80"
                src="/completed.svg"
                alt="completed stamp"
              />
            ) : isDisabled ? (
              <img
                className="w-12 h-12 opacity-80"
                src="/disabled.svg"
                alt="locaked stamp"
              />
            ) : (
              Array.from(Array(MAX_NUM_HINTS)).map((_, idx) => (
                <span
                  // eslint-disable-next-line react/no-array-index-key
                  key={`hint-bubble-${idx}`}
                  className={cn("block h-4 w-4 rounded-full", {
                    "bg-gray-400 animate-pulse": isLoading,
                    "bg-blue-400": !isLoading && idx < hintsUnlocked,
                    "bg-red-400": !isLoading && idx >= hintsUnlocked
                  })}
                />
              ))
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default LevelCard;
