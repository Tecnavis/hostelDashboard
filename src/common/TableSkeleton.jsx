import React from "react"
import { Skeleton } from "@/components/ui/skeleton"


export const TableSkeleton= ({ columns, rows = 6 }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            {columns.map((col, idx) => (
              <th key={idx} className="text-left py-3 px-4">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-b">
              {columns.map((_, colIdx) => (
                <td key={colIdx} className="py-3 px-4">
                  <Skeleton className="h-4 w-[70%]" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
