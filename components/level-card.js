const LevelCard = ({ title, summary, state, hints }) => {
  console.log(title, summary, state, hints);
  return (
    <>
      <div className="bg-white flex items-center p-2 rounded-xl shadow border max-w-sm">
        <div className="flex-grow p-3">
          <div className="text-lg font-semibold text-gray-700">LEVEL 1</div>
          <div className="text-sm text-gray-500">Unlocked at 2:30 PM</div>
        </div>
        <div className="p-2 space-y-1">
          <span className="block h-4 w-4 bg-blue-400 rounded-full" />
          <span className="block h-4 w-4 bg-blue-400 rounded-full" />
          <span className="block h-4 w-4 bg-blue-400 rounded-full" />
        </div>
      </div>
    </>
  );
};

export default LevelCard;
