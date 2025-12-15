export function RaulLiveData() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            RAUL™ Live Data
          </h2>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Live operational feed
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 md:p-3">
        <div className="w-full h-[75vh] border rounded-lg overflow-hidden">
<iframe
  src="https://docs.google.com/spreadsheets/d/1oCtuRrwIS16VH2FxEr6yA6Iuh4f7TidZAxfbY4q_bhQ/pubhtml?widget=true&headers=false"
  className="w-full h-full"
  frameBorder="0"
/>

        </div>
      </div>
    </div>
  );
}
