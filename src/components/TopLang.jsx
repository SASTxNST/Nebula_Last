import React from 'react';

const TopStatsBlock = ({
  topLanguages,
  estimatedTime,
  contributorRank,
  nextFetchTime,
}) => {
  return (
    <div className="mb-6 flex flex-col items-center justify-center rounded-xl bg-[#161B22] p-4">
      <p className="mb-2 text-sm text-gray-300">Profile Insights</p>
      <div className="text-center">
        <p className="text-xs text-gray-400">Top Languages:</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {topLanguages.map((lang) => (
            <span
              key={lang}
              className="rounded-full bg-[#2a2f4a] px-3 py-1 text-xs text-white"
            >
              {lang}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-400">
          ⏱️ Estimated Time: <span className="font-medium text-white">{estimatedTime}</span>
        </p>
      </div>
    </div>
  );
};

export default TopStatsBlock;