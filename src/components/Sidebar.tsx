// src/components/Sidebar.tsx
import { LayoutDashboard, Ticket, Activity, Menu, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const { signOut, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tickets", label: "Support Tickets", icon: Ticket },
    { id: "raul", label: "RAUL™ Live Data", icon: Activity },
    { id: "spaceEstimator", label: "Space Estimator", icon: Menu }, // new item
  ];

  const handleViewChange = (view: string) => {
    onViewChange(view);
    setIsOpen(false);
  };

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed md:static z-40 bg-gray-900 text-white h-full w-64 p-4 transition-transform duration-300`}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-[#D4AF37]">The Trivial Co.</h1>
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      <nav className="space-y-4">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleViewChange(id)}
            className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
              activeView === id
                ? "bg-[#D4AF37] text-black"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Icon className="mr-2 h-5 w-5" />
            {label}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4">
        <button
          onClick={signOut}
          className="flex items-center text-gray-400 hover:text-white"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Log Out
        </button>
      </div>
    </div>
  );
}
