export interface LeaveUsage {
    CL: number;
    SL: number;
    EL: number;
    ML: number;
    PL: number;
    WFH: number;
  }
  
  export interface LeaveTypes {
    CL: number;
    SL: number;
    EL: number;
    ML: number;
    PL: number;
    WFH: number;
  }
  
  export interface LeaveData {
    leaveUsage: LeaveUsage;
    leaveTypes: LeaveTypes;
    leavePolicy: string;
    holidayList: string;
  }
  
  export interface LeaveData {
    today_leave: UserData[]
    users: UserData[]
  }
  
  export interface UserData {
    name: string
    emp_id: string
    date: string
    status: 'accepted' | 'pending'
    leave_type: string
    leave: {
      PL: number
      CL: number
      SL: number
      EL: number
      ML: number
      WFH: number
      LOP: number
    }
  }
  
  