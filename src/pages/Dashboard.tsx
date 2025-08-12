import { useState, useEffect } from "react";
import { StatsCards } from "../components/dashboard/StatsCards";
import { ApprovalRequests } from "../components/dashboard/ApprovalRequests";
import { DriversTable } from "../components/dashboard/DriversTable";
import { mockDrivers, mockApprovalRequests } from "../data/mockData";
import type {
  Driver,
  ApprovalRequest,
  DashboardStats,
} from "../types/dashboard";

export function Dashboard() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>(
    []
  );
  const [stats, setStats] = useState<DashboardStats>({
    totalDrivers: 2200,
    onlineDrivers: 320,
    tripsInProgress: 76,
    newSignups: 17,
  });

  useEffect(() => {
    setDrivers(mockDrivers);
    setApprovalRequests(mockApprovalRequests);
  }, []);

  return (
    <>
    <div className="p-8 bg-gray-100">
      
      <div className="mb-6 ">
        <h1 className="text-2xl text-[#2A2A2A] font-semibold  mb-2">
          User Management
        </h1>
        <p className="text-[#888888] font-normal">Drivers</p>
      </div>

      <div className="  gap-6 mb-8">
        {/* Drivers Overview */}
        <div className=" w-full flex p-6 justify-between space-y-6 bg-white">
          <div className="w-180">
            <h2 className="text-2xl  text-[#0E121B] font-medium ">Drivers Overview</h2>
            <p className="text-sm font-light text-[#525866] mt-2 mb-3">
           
Break down lengthy texts into concise summaries to grasp.

            </p>
            <StatsCards stats={stats} />
          </div>
          <div className="w-150 space-y-3">
            <ApprovalRequests requests={approvalRequests} />
          </div>
        </div>
      </div>
      </div>

    
          <DriversTable drivers={drivers} />
          </>
  );
}
