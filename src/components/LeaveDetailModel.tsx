import React from 'react'
import { UserData } from '../models/LeaveData'


interface LeaveDetailsModalProps {
  visible: boolean
  title: string
  content: UserData[]
  loading: boolean
  onClose: () => void
}

export default function LeaveDetailsModal({ visible, title, content, loading, onClose }: LeaveDetailsModalProps) {
    if (!visible) return null
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{title}</h2>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {content.map((item, index) => (
                <li key={index} className="py-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-700">
                    {item.leave_type}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={onClose}
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    )
  }
