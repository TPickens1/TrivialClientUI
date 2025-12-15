import React from 'react';

interface SpaceEstimatorProps {
  onBack: () => void;
}

export function SpaceEstimator({ onBack }: SpaceEstimatorProps) {
  return (
    <div className="w-full h-[100svh] sm:h-full bg-white overflow-hidden">
      {/* Optional mobile back button */}
      <div className="sm:hidden absolute top-3 left-3 z-10">
        <button
          onClick={onBack}
          className="bg-black/80 text-white px-3 py-1.5 rounded-md text-sm"
        >
          ← Back
        </button>
      </div>

      <iframe
        src="PUT_YOUR_CLEARANCE_GUIDE_URL_HERE"
        title="Clearance Guide"
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
