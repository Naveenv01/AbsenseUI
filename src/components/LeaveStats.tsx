import React from 'react'
import { LeaveData, UserData } from '../models/LeaveData'


interface LeaveStatisticsProps {
  data: LeaveData
  setModalContent: React.Dispatch<React.SetStateAction<UserData[]>>
  setModalTitle: React.Dispatch<React.SetStateAction<string>>
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LeaveStatistics({ data, setModalContent, setModalTitle, setModalVisible }: LeaveStatisticsProps) {
    const todayLeave = data.today_leave || []
    const acceptedLeaves = todayLeave.filter((leave) => leave.status === 'accepted' && leave.leave_type !== 'WFH')
    const todayWFH = todayLeave.filter((leave) => leave.status === 'accepted' && leave.leave_type === 'WFH')
    const pendingLeaves = todayLeave.filter((leave) => leave.status === 'pending')
  
    const StatCard = ({ title, count, onClick }: { title: string; count: number; onClick: () => void }) => (
      <div
        className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
        onClick={onClick}
      >
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
        <p className="text-3xl font-bold text-gray-900">{count}</p>
      </div>
    )
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Today's Leaves"
          count={acceptedLeaves.length}
          onClick={() => {
            setModalTitle("Today's Leaves")
            setModalContent(acceptedLeaves)
            setModalVisible(true)
          }}
        />
        <StatCard
          title="Today's WFH"
          count={todayWFH.length}
          onClick={() => {
            setModalTitle("Today's WFH")
            setModalContent(todayWFH)
            setModalVisible(true)
          }}
        />
        <StatCard
          title="Pending Requests"
          count={pendingLeaves.length}
          onClick={() => {
            setModalTitle("Pending Requests")
            setModalContent(pendingLeaves)
            setModalVisible(true)
          }}
        />
      </div>
    )
  }
