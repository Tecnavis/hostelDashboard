import React from "react";

const TableSkeleton = () => {
  return (
    <tbody>
      {[...Array(5)].map((_, i) => (
        <tr key={i} className="border-b animate-pulse">
          <td className="py-3 px-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-200 rounded-md" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          </td>
          {[...Array(8)].map((_, j) => (
            <td key={j} className="py-3 px-4">
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </td>
          ))}
          <td className="py-3 px-4">
            <div className="h-4 w-6 bg-gray-200 rounded-full" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableSkeleton;
