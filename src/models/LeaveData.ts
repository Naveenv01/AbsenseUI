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
  
  