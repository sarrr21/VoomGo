"use client";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { MENU_ITEMS } from "../constants";
import VooGo from "../assets/image/VoomGo.svg"
import Plane from "../assets/icons/Panel.svg"


interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "User Management",
  ]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <div className="h-full">
        {/* Logo */}
        <div className=" ">
          <div className="flex  justify-between px-4 py-5">
           <img src={VooGo} alt="voogo" className=""/>
           <img src={Plane} alt="plane" className="w-6 h-6"/>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 mt-11">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider ">
            GENERAL
          </div>

          <nav className="space-y-1">
            {MENU_ITEMS.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.title)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 ${
                        expandedItems.includes(item.title)
                          ? "bg-blue-50 text-blue-600"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <svg
                        className={`h-4 w-4 transition-transform ${
                          expandedItems.includes(item.title) ? "rotate-90" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {expandedItems.includes(item.title) && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            to={child.href}
                            className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                              location.pathname === child.href
                                ? "bg-blue-100 text-blue-700 font-medium"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 ${
                      location.pathname === item.href
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div className="mt-auto p-4 border-t border-gray-200">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">
            TOOLS
          </div>
          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium">MM</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Mensur Mohammed</div>
            </div>
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
