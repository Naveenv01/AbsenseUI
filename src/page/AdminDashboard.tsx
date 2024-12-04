import { useState, useEffect } from "react"
import DashboardHeader from "../components/AdminDashboardHeader"
import LeaveDetailsModal from "../components/LeaveDetailModel"
import LeaveStatistics from "../components/LeaveStats"
import UserTable from "../components/UserTable"
import { LeaveData, UserData } from "../models/LeaveData"
import { fetchDashboardData, fetchUserDetails } from "../helper/api"


export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<LeaveData | null>(null)
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(new Date().getFullYear(), 3, 1), // Start of fiscal year (April 1st)
    new Date(),
  ])
  const [modalVisible, setModalVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState<UserData[]>([])
  const [modalLoading, setModalLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [dateRange])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchDashboardData(dateRange[0], dateRange[1])
      setData(result)
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setError('Failed to fetch data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleUserDetails = async (empId: string) => {
    setModalLoading(true)
    setModalTitle('Loading...')
    setModalVisible(true)
    setModalContent([])
    try {
      const userDetails = await fetchUserDetails(empId, dateRange[0], dateRange[1])
      setModalTitle(`Leave Details for Employee ID: ${empId}`)
      setModalContent(userDetails.leaves)
    } catch (error) {
      console.error('Failed to fetch user details:', error)
      setModalTitle('Error')
    } finally {
      setModalLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <div className="text-center text-red-500 mb-4">{error}</div>
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!data) {
    return null // This should never happen, but TypeScript needs it
  }

  return (
    <div className="bg-white">
    <div className="container mx-auto px-4 py-8 bg-white text-gray-900 ">
      <DashboardHeader dateRange={dateRange} setDateRange={setDateRange} />
      <LeaveStatistics data={data} setModalContent={setModalContent} setModalTitle={setModalTitle} setModalVisible={setModalVisible} />
      <UserTable users={data.users} onUserClick={handleUserDetails} />
      <LeaveDetailsModal
        visible={modalVisible}
        title={modalTitle}
        content={modalContent}
        loading={modalLoading}
        onClose={() => setModalVisible(false)}
      />
    </div>
    </div>
  )
}
  

