const HintPanelItem = ({ title, body }) => (
  <div className="px-3 py-5 text-gray-300">
    <h3 className="text-gray-600 font-black">{title}</h3>
    {body}
  </div>
);

const HintsPanel = ({ hints }) => {
  return (
    <div className="pb-3 bg-black rounded-lg w-full h-full md:w-1/3 lg:w-1/4 font-mono">
      <h2 className="p-3 text-white text-2xl font-black border-b border-gray-800">
        Hints panel
      </h2>
      {hints?.map((hint, idx) => (
        <HintPanelItem
          key={hint?.id || `hint_${idx + 1}`}
          title={`Hint ${idx + 1}`}
          body={hint.hint}
        />
      ))}
    </div>
  );
};

export default HintsPanel;
