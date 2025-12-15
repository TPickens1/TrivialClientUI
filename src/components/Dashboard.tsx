/**
 * Dashboard = dashboard content only.
 * View switching is owned by App.tsx.
 */
export function Dashboard() {
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
