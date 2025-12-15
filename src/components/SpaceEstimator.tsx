import React from 'react';

interface SpaceEstimatorProps {
  onBack: () => void;
}

export function SpaceEstimator({ onBack }: SpaceEstimatorProps) {
  return (
    <div className="relative w-full h-[100svh] sm:h-full bg-white overflow-hidden">
      
      {/* Mobile back button only */}
      <div className="sm:hidden absolute top-3 left-3 z-20">
        <button
          onClick={onBack}
          className="bg-black/80 text-white px-3 py-1.5 rounded-md text-sm"
        >
          ← Back
        </button>
      </div>

      {/* Clearance Guide iframe */}
      <iframe
        src="https://docs.google.com/spreadsheets/d/1oCtuRrwIS16VH2FxEr6yA6Iuh4f7TidZAxfbY4q_bhQ/preview"
        title="Clearance Guide"
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
