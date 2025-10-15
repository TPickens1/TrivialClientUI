import React from "react";

interface SpaceEstimatorProps {
  onBack: () => void;
}

export default function SpaceEstimator({ onBack }: SpaceEstimatorProps) {
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "black" }}>
      <div style={{ padding: "1rem" }}>
        <button
          onClick={onBack}
          style={{
            background: "#D4AF37",
            border: "none",
            padding: "10px 20px",
            color: "black",
            fontWeight: "600",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      <iframe
        src="https://script.google.com/a/macros/thetrivialcompany.com/s/AKfycbzldkPPgWKE_Yc9AffTFmanUwW-2LqhcyrqVmqAfQY1/dev"
        title="Space Estimator"
        style={{
          width: "100%",
          height: "90vh",
          border: "none",
        }}
        allowFullScreen
      />
    </div>
  );
}
