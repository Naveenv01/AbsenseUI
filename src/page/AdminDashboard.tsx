import { useState, useEffect } from "react"
import DashboardHeader from "../components/AdminDashboardHeader"
import LeaveDetailsModal from "../components/LeaveDetailModel"
import LeaveStatistics from "../components/LeaveStats"
import UserTable from "../components/UserTable"
import { LeaveData, UserData } from "../models/LeaveData"
import { fetchDashboardData, fetchUserDetails } from "../helper/api"


export default function   AdminDashboard() {
    const [loading, setLoading] = useState(true)
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
      console.log("loading started")
      try {
        const result = await fetchDashboardData(dateRange[0], dateRange[1])
        console.log("loading finished")
        setData(result)
      } catch (error) {
        console.error('Failed to fetch data:', error)
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
    
    if (!data) {
      return <div className="text-center text-red-500">Failed to fetch data. Please try again.</div>
    }
  
    if (loading) {
      return <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    }
  

  
    return (
      <div className="container mx-auto px-4 py-8 bg-white text-gray-900">
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
    )
  }
  

