import { useState, useEffect } from "react";
import { StatsCards } from "../components/dashboard/StatsCards";
import { ApprovalRequests } from "../components/dashboard/ApprovalRequests";
import { DriversTable } from "../components/dashboard/DriversTable";
import { useUsersList } from "../hooks/useUsers";
import { mapAdminUserToDriver, mapPendingDriverToApprovalCard } from "../utils/mappers";
import { usePendingDrivers } from "../hooks/usePendingDrivers";
import { exportDrivers } from "../services/drivers.service";
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
  const [stats, ] = useState<DashboardStats>({
    totalDrivers: 2200,
    onlineDrivers: 320,
    tripsInProgress: 76,
    newSignups: 17,
  });
  

  const [pageNum, setPageNum] = useState(1);
  const [search, setSearch] = useState("");
  const [serviceLevel, setServiceLevel] = useState<string | undefined>(undefined);
  const { data: usersData } = useUsersList({ page: pageNum, limit: 10, role: "driver", sortBy: "createdAt", sortOrder: "desc", search: search || undefined, serviceLevel });
  const { data: pendingData } = usePendingDrivers({ page: 1, limit: 5 });

  useEffect(() => {
    const users = usersData?.data?.users;
    setDrivers(users && Array.isArray(users) ? users.map(mapAdminUserToDriver) : []);

    const pending = pendingData?.data?.drivers;
    setApprovalRequests(pending && Array.isArray(pending) ? pending.map(mapPendingDriverToApprovalCard) : []);
  }, [usersData, pendingData]);

  return (
    <>
    <div className="p-8 bg-gray-100 overflow-x-hidden">
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#2A2A2A] font-semibold  mb-2">User Management</h1>
          <p className="text-[#888888] font-normal">Drivers</p>
        </div>
      </div>

      <div className="  gap-6 mb-8">

        <div className="w-full flex flex-col lg:flex-row p-6 justify-between gap-6 bg-white">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl  text-[#0E121B] font-medium ">Drivers Overview</h2>
            <p className="text-sm font-light text-[#525866] mt-2 mb-3">
           
Break down lengthy texts into concise summaries to grasp.

            </p>
            <StatsCards stats={stats} />
          </div>
          <div className="min-w-0 lg:w-auto space-y-3">
            <ApprovalRequests requests={approvalRequests} />
          </div>
        </div>
      </div>
      </div>

    
          <DriversTable
            drivers={drivers}
            searchValue={search}
            onSearchChange={setSearch}
            currentPage={pageNum}
            totalPages={usersData?.data?.pagination?.totalPages || 1}
            onPageChange={setPageNum}
            activeTab={(() => {
              if (!serviceLevel) return "All Drivers (2097)" as const
              if (serviceLevel === "Economy") return "Economy (793)" as const
              if (serviceLevel === "Comfort") return "Comfort (419)" as const
              if (serviceLevel === "XL Van") return "XL Van (152)" as const
              return "Delivery (373)" as const
            })()}
            onTabChange={(tab) => {
              const label = tab.split(" (")[0]
              setServiceLevel(label === "All Drivers" ? undefined : label)
              setPageNum(1)
            }}
            onExport={async (format) => {
              try {
                const blob = await exportDrivers({ format });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                const ext = format === "excel" ? "xlsx" : format;
                a.download = `drivers_${new Date().toISOString().slice(0,10)}.${ext}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
              } catch (e) {
                console.error("Export failed", e);
              }
            }}
            tabCounts={{
              "All Drivers": usersData?.data?.pagination?.totalUsers || 0,
              Economy: usersData?.data?.pagination?.totalUsers || 0,
              Comfort: usersData?.data?.pagination?.totalUsers || 0,
              "XL Van": usersData?.data?.pagination?.totalUsers || 0,
              Delivery: usersData?.data?.pagination?.totalUsers || 0,
            }}
          />
          </>
  );
}
