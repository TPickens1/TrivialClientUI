import { useState } from "react";
import { SupportTickets } from "./SupportTickets";
import { RaulLiveData } from "./RaulLiveData";
import { SpaceEstimator } from "./SpaceEstimator";

/**
 * Dashboard content controller.
 * Layout (Sidebar, app chrome) is owned by App.tsx.
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
    <div className="flex-1 h-full overflow-hidden">
      {renderView()}
    </div>
  );
}
