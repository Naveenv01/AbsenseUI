import React, { useEffect, useState } from 'react'
import { CalendarDays, Clock, User, FileText, Calendar } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { getLeaveUrl } from '../helper/URL';
import { LeaveApplicationModal } from '../components/LeaveCompoent';


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
  const [isModalOpen, setModalOpen] = useState(false);

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

  const handleApplyLeave = (leaveData: any) => {
    console.log('Leave application submitted:', leaveData);
    // Here you would typically send this data to your backend
    // You may want to update the leaveData state here based on the submitted leave
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Employee Leave Dashboard</h1>
        </div>
      </header> */}
      <nav className="bg-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 text-slate-800" />
              </div>
              <div className="ml-10 flex items-baseline space-x-4">
                <button 
                  onClick={() => setModalOpen(true)}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Apply Leave
                </button>
                <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
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
                    title={leaveTypeNames[key as keyof typeof leaveTypeNames]}
                    total={total}
                    used={leaveData.leaveUsage[key as keyof typeof leaveData.leaveUsage]}
                    icon={key === 'WFH' ? Clock : CalendarDays}
                  />
                ))}
              </div>
          
            <div className="mt-8 flex space-x-4">
              <a 
                href={leaveData.leavePolicy} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-700 hover:text-blue-900"
              >
                <FileText className="h-5 w-5 mr-2" />
                Leave Policy
              </a>
              <a 
                href={leaveData.holidayList} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-700 hover:text-blue-900"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Holiday List
              </a>
            </div>
          </div>
        </div>
      </main>
      <LeaveApplicationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleApplyLeave}
      />
    </div>
  )
}

function LeaveCard({ title, total, used, icon: Icon }) {
  const available = total - used;
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{available} days</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">
        <div className="text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Used: {used}</span>
            <span>Total: {total}</span>
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-indigo-600 rounded-full" 
              style={{ width: `${(used / total) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}