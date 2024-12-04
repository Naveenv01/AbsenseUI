import React from 'react'
import { format } from 'date-fns'

interface DashboardHeaderProps {
  dateRange: [Date, Date]
  setDateRange: React.Dispatch<React.SetStateAction<[Date, Date]>>
}

export default function DashboardHeader({ dateRange, setDateRange }: DashboardHeaderProps) {
    return (
      <div className="flex justify-between items-center mb-8 bg-white">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin</h1>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={format(dateRange[0], 'yyyy-MM-dd')}
            onChange={(e) => setDateRange([new Date(e.target.value), dateRange[1]])}
            className="border rounded p-2 bg-white text-gray-900"
          />
          <input
            type="date"
            value={format(dateRange[1], 'yyyy-MM-dd')}
            onChange={(e) => setDateRange([dateRange[0], new Date(e.target.value)])}
            className="border rounded p-2 bg-white text-gray-900"
          />
          <button
            onClick={() => {/* Implement logout functionality */}}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

