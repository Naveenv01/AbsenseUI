import React, { useEffect, useState } from 'react'
import { CalendarDays, Clock, User, FileText, Calendar } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { getLeaveUrl } from '../helper/URL';


// TypeScript interface for LeaveData
interface LeaveData {
  leaveUsage: {
    CL: number;
    SL: number;
    EL: number;
    ML: number;
    PL: number;
    WFH: number;
  };
  leaveTypes: {
    CL: number;
    SL: number;
    EL: number;
    ML: number;
    PL: number;
    WFH: number;
  };
  leavePolicy: string;
  holidayList: string;
}

const leaveTypeNames = {
  CL: "Casual Leave",
  SL: "Sick Leave",
  EL: "Earned Leave",
  ML: "Maternity Leave",
  PL: "Personal Leave",
  WFH: "Work From Home"
};

export default function LeaveDashboard() {
  const [leaveData, setLeaveData] = useState<LeaveData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(getLeaveUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch leave data');
        }

        const data: LeaveData = await response.json();
        setLeaveData(data);
      } catch (err) {
        console.error('Error fetching leave data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    fetchLeaveData();
  }, []);
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-xl">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!leaveData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900"> Leave Dashboard</h1>
        </div>
      </header>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </a>

                  Apply Leave
                
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Leave History
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Leave Balance</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(leaveData.leaveTypes).map(([key, total]) => (
                <LeaveCard 
                  key={key}
                  title={leaveTypeNames[key as keyof typeof leaveTypeNames] || key}
                  total={total}
                  used={leaveData.leaveUsage[key as keyof typeof leaveData.leaveUsage] || 0}
                  icon={key === 'WFH' ? Clock : CalendarDays}
                />
              ))}
            </div>
            <div className="mt-8 flex space-x-4">
              <a 
                href={leaveData.leavePolicy} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <FileText className="h-5 w-5 mr-2" />
                Leave Policy
              </a>
              <a 
                href={leaveData.holidayList} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Holiday List
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function LeaveCard({ title, total, used, icon: Icon }) {
  const balance=total-used
  let available = 0;
  if(balance>0) available = balance

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center gap-2">
          <CardTitle>{title}</CardTitle>
          <Icon className="h-4 w-4 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 py-2">{available} days</div>
        <p className="text-xs text-gray-600">Available balance</p>
        <div className="mt-2 flex justify-between text-sm text-gray-700">
          <span>Used: {used}</span>
          <span>Total: {total}</span>
        </div>
      </CardContent>
    </Card>
  )
}