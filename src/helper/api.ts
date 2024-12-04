import axios from 'axios'
import { LeaveData, UserData } from '../models/LeaveData'


const API_URL = 'https://script.google.com/macros/s/AKfycbxpNMBUfGy6SlCNcjFpoJ1mXo3rVAm60i0-ULd4HOksjGXQr7ykV2mWtJ2-naa40ZeB0A/exec'

export async function fetchDashboardData(startDate: Date, endDate: Date): Promise<LeaveData> {
  try {
    const response = await axios.get(
      `https://script.google.com/macros/s/AKfycbxpNMBUfGy6SlCNcjFpoJ1mXo3rVAm60i0-ULd4HOksjGXQr7ykV2mWtJ2-naa40ZeB0A/exec`,
      {
        params: {
          path: "getUser",
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
        },
      }
    );
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    throw new Error('Failed to fetch dashboard data. Please try again.')
  }
}

export async function fetchUserDetails(empId: string, startDate: Date, endDate: Date): Promise<{ leaves: UserData[] }> {
  const response = await axios.get(API_URL, {
    params: {
      path: 'userLeave',
      empId,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
    },
    headers: {
      'Access-Control-Allow-Origin':'*'
    }
  })
  return response.data
}

// Helper function to format date for API requests
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

// Function to handle errors in API calls
function handleApiError(error: any): never {
  console.error('API call failed:', error)
  throw new Error('Failed to fetch data from the API')
}

// Function to get leave balance for a specific user
export async function fetchLeaveBalance(empId: string): Promise<UserData['leave']> {
  try {
    const response = await axios.get(API_URL, {
      params: {
        path: 'getLeaveBalance',
        empId,
      },
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    return response.data.leave
  } catch (error) {
    return handleApiError(error)
  }
}

// Function to submit a new leave request
export async function submitLeaveRequest(leaveData: {
  empId: string
  startDate: Date
  endDate: Date
  leaveType: string
  reason: string
}): Promise<{ success: boolean; message: string }> {
  try {
    const response = await axios.post(API_URL, {
      path: 'submitLeave',
      ...leaveData,
      startDate: formatDate(leaveData.startDate),
      endDate: formatDate(leaveData.endDate),
    })
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

// Function to approve or reject a leave request
export async function updateLeaveStatus(leaveId: string, status: 'approved' | 'rejected', adminId: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await axios.post(API_URL, {
      path: 'updateLeaveStatus',
      leaveId,
      status,
      adminId,
    })
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

// Function to fetch holiday list
export async function fetchHolidayList(year: number): Promise<{ date: string; name: string }[]> {
  try {
    const response = await axios.get(API_URL, {
      params: {
        path: 'getHolidayList',
        year,
      },
    })
    return response.data.holidays
  } catch (error) {
    return handleApiError(error)
  }
}


//https://script.google.com/macros/s/AKfycbxpNMBUfGy6SlCNcjFpoJ1mXo3rVAm60i0-ULd4HOksjGXQr7ykV2mWtJ2-naa40ZeB0A/exec?path=userLeave&empId=1&start_date=2024-03-31&end_date=2024-12-04
//https://script.google.com/macros/s/AKfycbxpNMBUfGy6SlCNcjFpoJ1mXo3rVAm60i0-ULd4HOksjGXQr7ykV2mWtJ2-naa40ZeB0A/exec?path=userLeave&empId=1&start_date=2024-04-01&end_date=2024-12-04