const LevelStatisticsTable = ({ user }) => {
  const { levelStats } = user;
  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              level
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              isLevelUnlocked{" "}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              isLevelSolved{" "}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              solvedIn{" "}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              hints{" "}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              points
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.keys(levelStats).map((levelId) => (
            <tr key={levelId}>
              <td className="px-6 py-4 whitespace-nowrap">{levelId || ""}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {levelStats[levelId].isLevelUnlocked ? "YES" : "NO"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {levelStats[levelId].isLevelSolved ? "YES" : "NO"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {levelStats[levelId].solvedIn || ""}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {levelStats[levelId].hints || ""}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {levelStats[levelId].points || ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LevelStatisticsTable;
