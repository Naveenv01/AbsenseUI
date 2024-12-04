import { UserData } from "../models/LeaveData"


interface UserTableProps {
  users: UserData[]
  onUserClick: (empId: string) => void
}

export default function UserTable({ users, onUserClick }: UserTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emp ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ML</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WFH</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LOP</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.emp_id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onUserClick(user.emp_id)}
                  className="text-blue-600 hover:text-blue-900 bg-white"
                >
                  {user.name}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.emp_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.leave.PL}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.leave.CL}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.leave.SL}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.leave.EL}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.leave.ML}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.leave.WFH}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.leave.LOP}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

