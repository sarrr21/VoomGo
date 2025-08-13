import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/Button";
import { getStatusColor } from "../../utils/helpers";
import { DRIVER_TABS } from "../../constants";

import type { Driver } from "../../types/dashboard";
import Export from "../../assets/icons/export.svg"
import Delete from "../../assets/icons/delete.svg"
import View from "../../assets/icons/view.svg"
import { Pagination } from "../Pagination";
import SuspensionPopup from "../driver/DriverSuspensionModal";
import type { SuspensionUser, SuspensionFormData  } from "../../types/approval"
import {   useSuspendUser } from "../../hooks/useUsers";


interface DriversTableProps {
  drivers: Driver[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  activeTab?: (typeof DRIVER_TABS)[number];
  onTabChange?: (tab: (typeof DRIVER_TABS)[number]) => void;
  tabCounts?: Record<string, number>;
  onExport?: (format: "excel" | "csv" | "pdf") => void;
}

export function DriversTable({ drivers, searchValue, onSearchChange, currentPage, totalPages: totalPagesProp, onPageChange, activeTab: controlledTab, onTabChange, tabCounts, onExport }: DriversTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<(typeof DRIVER_TABS)[number]>(DRIVER_TABS[0]);
  const [isOpen, setIsOpen] = useState(false)
  const [page, setPage] = useState(1);
  const totalPages = totalPagesProp ?? 13;
  const [exportOpen, setExportOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SuspensionUser | null>(null);

  const suspendMutation = useSuspendUser();
  // const activateMutation = useActivateUser();

  const handleSubmit = async (data: SuspensionFormData) => {
    if (!selectedUser) return;
    try {
      const duration = data.suspensionType === "temporary" ? data.days ?? 0 : undefined;
      await suspendMutation.mutateAsync({
        userId: selectedUser.id,
        reason: data.reason,
        duration,
        suspensionType: data.suspensionType,
      });
    } catch (err) {
      console.error("Suspend failed", err);
    } finally {
      setIsOpen(false);
      setSelectedUser(null);
    }
  }
  const effectiveSearch = searchValue ?? searchTerm;
  const handleLocalSearch = (value: string) => {
    if (onSearchChange) onSearchChange(value);
    else setSearchTerm(value);
  };

  const effectiveTab = controlledTab ?? activeTab;
  const handleTabChange = (tab: (typeof DRIVER_TABS)[number]) => {
    if (onTabChange) onTabChange(tab);
    else setActiveTab(tab);
  };

 

  return (
    <div className="p-8 overflow-x-hidden">
      <div className="flex items-center bg-white justify-between mb-6">
        <div className="relative max-w-full md:max-w-md min-w-0">
          
        <input
        type="text"
        value={effectiveSearch}
        placeholder="Search for id, name, phone number"
        className="w-full md:w-[500px] px-4 py-3 pr-12 text-gray-700 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
        onChange={(e) => handleLocalSearch(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
        </div>

        <div className="relative">
          <Button variant="outline" size="sm" onClick={() => setExportOpen((p) => !p)}>
            <span><img src={Export} alt="export" className="w-6 h-6"/></span> Export
          </Button>
          {exportOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow z-10">
              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => { if (onExport) onExport("excel"); setExportOpen(false); }}
              >
                Excel
              </button>
              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => { if (onExport) onExport("csv"); setExportOpen(false); }}
              >
                CSV
              </button>
              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => { if (onExport) onExport("pdf"); setExportOpen(false); }}
              >
                PDF
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between border py-2 px-3 rounded-2xl border-[#D1D1D1] mb-6 ">
        {DRIVER_TABS.map((tab) => {
          const base = tab.split(" (")[0];
          const count = tabCounts?.[base];
          const label = count !== undefined ? `${base} (${count})` : base;
          return (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`py-2 px-3 rounded-xl  text-sm font-medium  transition-colors ${
              effectiveTab === tab
                ? "bg-[#D9EDFF] text-blue-600"
                : ""
            }`}
          >
            {label}
          </button>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Driver Id & Name
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Phone Number
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Car Type
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Date Created
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={"https://www.sublimio.com/wp-content/uploads/2023/04/Sublimio_Personal-branding-examples_Web.jpg"}
                        alt={driver.name}
                        className="w-10 h-10 rounded-xl"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {driver.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {driver.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{driver.phone}</td>
                  <td className="py-4 px-4 text-gray-900">{driver.carType}</td>
                  <td className="py-4 px-4 text-gray-500">
                    {driver.dateCreated}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2 rounded-lg py-1.5  text-xs font-medium ${getStatusColor(
                        driver.status
                      )}`}
                    >
                      {driver.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Link to={`/drivers/${driver.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <img src={View} alt="view" className="w-6 h-6"/>
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const user: SuspensionUser = {
                            id: driver.id,
                            name: driver.name,
                            email: driver.email,
                            avatar: driver.avatar,
                          };
                          setSelectedUser(user);
                          setIsOpen(true);
                        }}
                      >
                        <img src={Delete} alt="delete" className="w-6 h-6"/>
                      </Button>
                    
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        

      </div>
      <div>
      <Pagination
        currentPage={currentPage ?? page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          if (onPageChange) onPageChange(newPage)
          else setPage(newPage)
        }}
      />
    </div>

      
      {selectedUser && (
        <SuspensionPopup
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
