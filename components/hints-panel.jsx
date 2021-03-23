const HintsPanel = () => {
  return (
    <div className="pb-3 bg-black rounded-lg w-full h-full md:w-1/3 lg:w-1/4 font-mono">
      <h2 className="p-3 text-white text-2xl font-black border-b border-gray-800">
        Hints Panel
      </h2>
      <div className="px-3 py-5 text-gray-300">
        {/* Hint Panel Item */}
        <h3 className="text-gray-600 font-black">Hint 1</h3>
        Hints .... Unlocks at 4:30 PM Tuesday Unlocks at 4:30 PM Tuesday
      </div>
      <div className="px-3 py-5 text-gray-300">
        {/* Hint Panel Item */}
        <h3 className="text-gray-600 font-black">Hint 2</h3>
        Unlocks at 2:30 PM Tuesday
      </div>
      <div className="px-3 py-5 text-gray-300">
        {/* Hint Panel Item */}
        <h3 className="text-gray-600 font-black">Hint 3</h3>
        Unlocks at 4:30 PM Tuesday
      </div>
    </div>
  );
};

export default HintsPanel;
