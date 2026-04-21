import { useState } from "react";
import { isConnected } from "@stellar/freighter-api";
import { claimBaon } from "../../stellar/stellar";
import Card from "../Layout/Card";
import DisputePage from "./DisputePage";

export default function EscrowDetail({ escrow, address, onBack }) {
  const [mode, setMode] = useState("detail");
  const [isReleasing, setIsReleasing] = useState(false);

  const isFinalized =
    escrow?.status === "Released" || escrow?.status === "Disputed";

  const handleRelease = async () => {
    if (isFinalized || isReleasing) return;
    
    const studentAddress = escrow?.fullRecipient || escrow?.recipient;

    if (address !== targetStudent) {
      alert("Error: Recipient address not found in this escrow.");
      return;
    }

    if (!(await isConnected())) {
      alert("Connect Freighter.");
      return;
    }

    setIsReleasing(true);
    try {
      console.log("Triggering claim for student:", studentAddress);
      
      await claimBaon(studentAddress);
      
      alert("Funds successfully released!");
      onBack();
    } catch (error) {
      console.error("BLOCKCHAIN ERROR:", error);
      alert("Transaction failed: " + (error.message || "Declined"));
    } finally {
      setIsReleasing(false);
    }
  };

  if (mode === "dispute")
    return <DisputePage escrow={escrow} onBack={() => setMode("detail")} />;

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#4A90E2",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        ← Back to Dashboard
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: "2rem",
        }}
      >
        <div>
          <Card title="Contract Status">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <div>
                <p style={{ color: "#888", margin: 0 }}>Locked Volume</p>
                <h2 style={{ margin: 0 }}>{escrow?.amount || "0.00"} USDC</h2>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ color: "#888", margin: 0 }}>Status</p>
                <span
                  style={{
                    color: isFinalized ? "#e53e3e" : "#48bb78",
                    fontWeight: "bold",
                  }}
                >
                  {escrow?.status?.toUpperCase()}
                </span>
              </div>
            </div>

            <div
              style={{
                background: "#050505",
                padding: "1.5rem",
                borderRadius: "12px",
                border: "1px solid #111",
              }}
            >
              <p style={{ color: "#888", margin: 0 }}>Auto-Release Countdown</p>
              <h2 style={{ color: "#4A90E2", margin: "10px 0" }}>
                {isFinalized ? "00h 00m 00s" : "22h 59m 09s"}
              </h2>
              <small style={{ color: "#444" }}>
                {escrow?.releaseDate || "Pending"}
              </small>
            </div>
          </Card>
        </div>

        <div>
          <Card title="Guardian Controls">
            <button
              onClick={handleRelease}
              disabled={isReleasing || isFinalized}
              style={{
                width: "100%",
                padding: "1rem",
                background: isFinalized ? "#222" : "#4A90E2",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                marginBottom: "1rem",
                cursor: isReleasing || isFinalized ? "not-allowed" : "pointer",
                opacity: isReleasing || isFinalized ? 0.5 : 1,
              }}
            >
              {isReleasing
                ? "SIGNING..."
                : isFinalized
                  ? "CONTRACT CLOSED"
                  : "Confirm Release"}
            </button>

            <button
              onClick={() => !isFinalized && setMode("dispute")}
              disabled={isFinalized}
              style={{
                width: "100%",
                padding: "1rem",
                background: "transparent",
                color: isFinalized ? "#444" : "#e53e3e",
                border: `1px solid ${isFinalized ? "#444" : "#e53e3e"}`,
                borderRadius: "8px",
                cursor: isFinalized ? "not-allowed" : "pointer",
              }}
            >
              Raise Dispute
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}