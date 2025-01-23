import React, { useState } from 'react'
import { format } from 'date-fns'

interface LeaveApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leaveData: LeaveApplicationData) => void;
}

interface LeaveApplicationData {
  dates: { date: Date; leaveType: string }[];
  reason: string;
}

const leaveTypes = [
  { value: 'CL', label: 'Casual Leave' },
  { value: 'SL', label: 'Sick Leave' },
  { value: 'EL', label: 'Earned Leave' },
  { value: 'ML', label: 'Maternity Leave' },
  { value: 'PL', label: 'Personal Leave' },
  { value: 'WFH', label: 'Work From Home' },
];

export function LeaveApplicationModal({ isOpen, onClose, onSubmit }: LeaveApplicationModalProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [dateLeaveTypes, setDateLeaveTypes] = useState<{ [key: string]: string }>({})
  const [reason, setReason] = useState<string>('')

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setSelectedDates(prev => {
        if (prev.some(d => d.toDateString() === date.toDateString())) {
          return prev.filter(d => d.toDateString() !== date.toDateString());
        } else {
          return [...prev, date];
        }
      });
    }
  }

  const handleLeaveTypeChange = (date: Date, leaveType: string) => {
    setDateLeaveTypes(prev => ({ ...prev, [date.toISOString()]: leaveType }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const leaveData: LeaveApplicationData = {
      dates: selectedDates.map(date => ({
        date,
        leaveType: dateLeaveTypes[date.toISOString()] || ''
      })),
      reason
    }
    onSubmit(leaveData)
    onClose()
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Apply for Leave</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Select Dates
            </label>
            <input
              type="date"
              id="date"
              onChange={handleDateSelect}
              className="w-full p-2 border border-gray-300 rounded bg-white text-black [color-scheme:light]"
            />
          </div>
          {selectedDates.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Dates</h3>
              {selectedDates.map((date) => (
                <div key={date.toISOString()} className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">{format(date, 'dd MMM yyyy')}</span>
                  <select
                    value={dateLeaveTypes[date.toISOString()] || ''}
                    onChange={(e) => handleLeaveTypeChange(date, e.target.value)}
                    className="p-1 border border-gray-300 rounded bg-white text-black"
                  >
                    <option value="">Select leave type</option>
                    {leaveTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for leave"
              className="w-full p-2 border border-gray-300 rounded bg-white text-black"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedDates.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

