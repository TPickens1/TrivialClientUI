import { ArrowLeft } from "lucide-react";

interface SpaceEstimatorProps {
  onBack?: () => void;
}

export function SpaceEstimator({ onBack }: SpaceEstimatorProps) {
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center text-[#D4AF37] hover:text-yellow-300 font-semibold"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Dashboard
          </button>
        )}
        <h1 className="text-lg font-bold">Space Estimator</h1>
      </div>

      {/* Embedded Google Apps Script Web App */}
      <iframe
        src="https://script.google.com/macros/s/AKfycbxx3WmvZ3ql-kIUX1c6Vx1KSDyr3lJ11h3WX4HpbySUoKUuAcSBtKgj6e-XIxyvvIjUjg/exec"
        title="Space Estimator"
        className="flex-1 border-0"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      ></iframe>
    </div>
  );
}
