import React from 'react';

export function LoadingSkeleton({ type = 'card', count = 1 }) {
  const items = Array.from({ length: count });

  if (type === 'chart') {
    return (
      <div className="w-full h-72 bg-gray-200/60 dark:bg-gray-800/60 rounded-2xl animate-pulse p-6 flex flex-col justify-between">
        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-44 w-full bg-gray-300/40 dark:bg-gray-700/40 rounded-xl"></div>
        <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>
    );
  }

  if (type === 'prediction') {
    return (
      <div className="w-full bg-gray-200/60 dark:bg-gray-800/60 rounded-2xl animate-pulse p-6 space-y-4">
        <div className="h-6 w-2/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-20 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {items.map((_, idx) => (
        <div key={idx} className="h-32 bg-gray-200/60 dark:bg-gray-800/60 rounded-2xl animate-pulse p-5 flex flex-col justify-between border border-gray-200/50 dark:border-gray-800/50">
          <div className="flex justify-between items-center">
            <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
          <div className="h-8 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="h-3 w-3/4 bg-gray-300/60 dark:bg-gray-700/60 rounded"></div>
        </div>
      ))}
    </div>
  );
}
export default LoadingSkeleton;
