// src/Dashboard.tsx
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { SupportTickets } from "./SupportTickets";
import { RaulLiveData } from "./RaulLiveData";
import { SpaceEstimator } from "./SpaceEstimator";


export default function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderView = () => {
    switch (activeView) {
      case "tickets":
        return <Tickets />;
      case "raul":
        return <RaulLive />;
      case "spaceEstimator":
        return <SpaceEstimator onBack={() => setActiveView("dashboard")} />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 overflow-hidden">{renderView()}</div>
    </div>
  );
}
