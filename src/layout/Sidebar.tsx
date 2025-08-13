import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { MENU_ITEMS, type IconKey } from "../constants";
import {
  Home,
  Store,
  FileText,
  LineChart,
  Headphones,
  Gift,
  Settings,
  HelpCircle,
} from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
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
  const { user, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  type MenuItem = (typeof MENU_ITEMS)[number];
  type ChildItem = { readonly title: string; readonly href: string };
  const isGroup = (item: MenuItem): item is MenuItem & { readonly children: readonly ChildItem[] } =>
    Object.prototype.hasOwnProperty.call(item, "children");

  const Icon = ({ keyName }: { keyName: IconKey }) => {
    switch (keyName) {
      case "home":
        return <Home className="w-5 h-5 stroke-[1.4] text-gray-400" />;
      case "store":
        return <Store className="w-5 h-5 stroke-[1.4] text-gray-400" />;
      case "fileText":
        return <FileText className="w-5 h-5 stroke-[1.4] text-gray-400" />;
      case "lineChart":
        return <LineChart className="w-5 h-5 stroke-[1.4] text-gray-400" />;
      case "headphones":
        return <Headphones className="w-5 h-5 stroke-[1.4] text-gray-400" />;
      case "gift":
        return <Gift className="w-5 h-5 stroke-[1.4] text-gray-400" />;
      case "settings":
        return <Settings className="w-5 h-5 stroke-[1.4] text-gray-400" />;
      case "help":
        return <HelpCircle className="w-5 h-5 stroke-[1.4] text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 overflow-y-auto ${
        isOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <div className="h-full">

        <div className=" ">
          <div className="flex justify-between items-center px-4 py-5">
           <img src={VooGo} alt="voogo" className=""/>
           <button onClick={onToggle} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100">
             <img src={Plane} alt="toggle" className="w-5 h-5"/>
           </button>
          </div>
        </div>
        

        <div className="px-4 mt-11">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider ">
            GENERAL
          </div>

          <nav className="space-y-2">
            {MENU_ITEMS.map((item) => {
              if (isGroup(item)) {
                const expanded = expandedItems.includes(item.title);
                return (
                  <div key={item.title}>
                    {item.title === "Account & Settings" && (
                      <div className="px-3 pt-4 text-xs font-normal text-gray-400 uppercase tracking-wider">TOOLS</div>
                    )}
                    <button
                      onClick={() => toggleExpanded(item.title)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-normal rounded-md hover:bg-gray-100 ${
                        expanded ? "bg-blue-50 text-black" : "text-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {<Icon keyName={(item as unknown as { iconKey: IconKey }).iconKey} />}
                        <span className="font-normal">{item.title}</span>
                      </div>
                      <svg
                        className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    {expanded && (
                      <div className="mt-2 ml-4 pl-4 space-y-2 border-l border-gray-200">
                        {item.children.map((child: ChildItem) => (
                          <Link
                            key={child.title}
                            to={child.href}
                            className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                              location.pathname === child.href
                                ? "text-blue-600"
                                : "text-gray-400 hover:bg-gray-100"
                            }`}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              const leaf = item as { readonly href: string; readonly iconKey?: IconKey; readonly title: string };
              return (
                <div key={leaf.title}>
                  {leaf.title === "Account & Settings" && (
                    <div className="px-3 pt-4 text-xs font-normal text-gray-400 uppercase tracking-wider">TOOLS</div>
                  )}
                  <Link
                    to={leaf.href}
                    className={`flex items-center gap-3 px-3 py-2 text-sm font-normal rounded-md hover:bg-gray-100 ${
                      location.pathname === leaf.href ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    {leaf.iconKey ? <Icon keyName={leaf.iconKey} /> : null}
                    <span className="font-normal">{leaf.title}</span>
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>


        <div className="mt-auto p-4  border-gray-200">
          <div className="relative rounded-2xl border border-gray-200 p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/80?img=12" alt="avatar" className="w-10 h-10 rounded-lg object-cover" />
              <div>
                <div className="text-sm text-gray-900">{user?.fullName || "User"}</div>
                <div className="text-xs text-gray-400">{user?.role || "Admin"}</div>
              </div>
            </div>
            <button
              className="p-1 rounded-md hover:bg-gray-100"
              onClick={() => setProfileMenuOpen((p) => !p)}
              aria-label="Open profile menu"
            >
              <ChevronDown className={`h-5 w-5 text-gray-900 transition-transform ${profileMenuOpen ? "rotate-180" : ""}`} />
            </button>
            {profileMenuOpen && (
              <div className="absolute right-3 top-full mt-2 w-36 bg-white border border-gray-200 rounded-md shadow">
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  onClick={async () => {
                    await logout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
