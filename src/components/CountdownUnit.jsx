import React from 'react';
import "../styles/app.css"

const CountdownUnit = ({ value, unit, showSeparator }) => {
  return (
    <>
      <div className="flex flex-col items-center mx-1 sm:mx-2">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-gray-600/50 bg-black bg-opacity-60 p-3 shadow-2xl sm:h-24 sm:w-24 sm:p-4 md:h-28 md:w-28">
          <span className="font-orbitron text-3xl font-bold tabular-nums tracking-wider text-gray-100 sm:text-4xl md:text-5xl">
            {String(value).padStart(2, '0')}
          </span>
          <div className="absolute inset-0 animate-pulse rounded-lg border border-gray-400/40 opacity-60 transition-opacity duration-300 group-hover:opacity-80"></div>
        </div>
        <span className="mt-2 text-xs uppercase tracking-wider text-gray-400 sm:text-sm md:text-base">{unit}</span>
      </div>
      {showSeparator && (
        <div className="flex items-center px-1 sm:px-2 h-20 sm:h-24 md:h-28">
          <span className="font-orbitron text-3xl text-gray-500 opacity-80 sm:text-4xl md:text-5xl">:</span>
        </div>
      )}
    </>
  );
};

export default CountdownUnit;