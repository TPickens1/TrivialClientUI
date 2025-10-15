import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { SupportTickets } from "./SupportTickets";
import { RaulLiveData } from "./RaulLiveData";
import { SpaceEstimator } from "./SpaceEstimator";

/**
 * Main Dashboard component — controls view switching between
 * Dashboard overview, Support Tickets, RAUL Live Data, and Space Estimator.
 */
export function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderView = () => {
    switch (activeView) {
      case "tickets":
        return <SupportTickets />;
      case "raul":
        return <RaulLiveData />;
      case "spaceEstimator":
        return <SpaceEstimator onBack={() => setActiveView("dashboard")} />;
      default:
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-[#D4AF37] mb-4">
              Project Dashboard
            </h1>
            <p className="text-gray-300">
              Select an option from the sidebar to view your project data.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 overflow-hidden">{renderView()}</div>
    </div>
  );
}
