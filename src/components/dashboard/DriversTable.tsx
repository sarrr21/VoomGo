"use client";

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


interface DriversTableProps {
  drivers: Driver[];
}

export function DriversTable({ drivers }: DriversTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(DRIVER_TABS[0]);
  const [isOpen, setIsOpen] = useState(false)
  const [page, setPage] = useState(1);
  const totalPages = 13;

  const mockUser: SuspensionUser = {
    id: "1",
    name: "Esmail Abdulkadir",
    email: "esmail@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  const handleSubmit = (data: SuspensionFormData) => {
    console.log("Suspension data:", data)
    // Here you would typically send the data to your API
    setIsOpen(false)
  }
  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm)
  );

 

  return (
    <div className="p-8">
      {/* Search and Filters */}
      <div className="flex items-center bg-white justify-between mb-6 ">
        <div className="relative max-w-md">
          
        <input
        type="text"
        value=""
        placeholder="Search for id, name, phone number"
        className="w-[500px] px-4 py-3 pr-12 text-gray-700 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
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

        <Button variant="outline" size="sm">
          <span><img src={Export} alt="export" className="w-6 h-6"/></span> Export
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex justify-between border py-2 px-3 rounded-2xl border-[#D1D1D1] mb-6 ">
        {DRIVER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-3 rounded-xl  text-sm font-medium  transition-colors ${
              activeTab === tab
                ? "bg-[#D9EDFF] text-blue-600"
                : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Drivers Table */}
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
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={driver.avatar || "/placeholder.svg"}
                        alt={driver.name}
                        className="w-10 h-10 rounded-full"
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
                        <Button variant="ghost" size="sm"
                         onClick={() => setIsOpen(true)}>
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
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>

      {/* Suspension Modal */}
      <SuspensionPopup
        isOpen={isOpen} onClose={() => setIsOpen(false)} user={mockUser} onSubmit={handleSubmit}
      />
    </div>
  );
}
