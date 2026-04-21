import React from "react";
import Card from "../Layout/Card";

export default function HistoryView({ selectedEscrow, escrowList = [] }) {
  const stages = ["Created", "Confirmed", "Expired", "Released"];

  if (!selectedEscrow) {
    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>ACTIVITY LOG</h3>

        {escrowList.map((escrow) => (
          <div key={escrow.id} style={individualLogTile}>
            <div style={logTextWrapper}>
              <strong style={logTitleStyle}>Protocol Init: {escrow.amount} XLM</strong>
              <small style={logDateStyle}>{escrow.timestamp}</small>
            </div>
            <div style={statusBadgeStyle}>{escrow.status || "PENDING"}</div>
          </div>
        ))}

        <div style={{ ...individualLogTile, opacity: 0.6 }}>
          <div style={logTextWrapper}>
            <strong style={logTitleStyle}>Wallet Connected</strong>
            <small style={logDateStyle}>
              {new Date().toLocaleTimeString()}
            </small>
          </div>
          <div style={statusBadgeStyle}>SECURED</div>
        </div>

        <p style={outsideNoticeStyle}>
          {escrowList.length > 0 ? "Showing recent contract activity." : "No active escrows selected. Create one to see the timeline."}
        </p>
      </div>
    );
  }

  const currentStatus = selectedEscrow.status;
  const currentIndex = stages.indexOf(currentStatus);

  return (
    <div style={containerStyle}>
      <h3 style={sectionTitleStyle}>TRANSACTION DETAIL</h3>
      <div style={glassCardStyle}>
        <div style={headerGridStyle}>
          <div>
            <p style={labelStyle}>Reference ID</p>
            <strong style={valueTextStyle}>{selectedEscrow.id}</strong>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={labelStyle}>Amount</p>
            <strong style={amountTextStyle}>{selectedEscrow.amount} XLM</strong>
          </div>
        </div>

        <div style={progressContainerStyle}>
          {stages.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            return (
              <div
                key={step}
                style={{ textAlign: "center", zIndex: 2, flex: 1 }}
              >
                <div style={dotStyle(isCompleted)} />
                <p style={stepTextStyle(isCompleted)}>{step.toUpperCase()}</p>
              </div>
            );
          })}
          <div style={trackStyle} />
          <div style={fillStyle(currentIndex, stages.length)} />
        </div>
      </div>

      <h3 style={{ ...sectionTitleStyle, marginTop: "3rem" }}>CONTRACT LOGS</h3>
      <div style={individualLogTile}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={statusDotStyle(true)} />
          <span style={logTitleStyle}>
            Contract Initialized: {selectedEscrow.amount} XLM locked for{" "}
            {selectedEscrow.recipientName}
          </span>
        </div>
      </div>

      {currentIndex >= 1 && (
        <div style={individualLogTile}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={statusDotStyle(true)} />
            <span style={logTitleStyle}>
              Confirmed: Transaction verified on Soroban Testnet
            </span>
          </div>
        </div>
      )}

      <p style={outsideNoticeStyle}>
        • Awaiting further contract state changes...
      </p>
    </div>
  );
}

// --- Styles Variables ---
const containerStyle = {
  width: "100%",
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "40px",
  boxSizing: "border-box",
};

const sectionTitleStyle = {
  fontSize: "2.2rem",
  fontWeight: "900",
  color: "#fff",
  marginBottom: "25px",
  letterSpacing: "1px",
  textAlign: "left",
};

const glassCardStyle = {
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(40px)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "32px",
  padding: "40px",
  marginBottom: "15px",
  boxSizing: "border-box",
};

const individualLogTile = {
  background: "rgba(255, 255, 255, 0.02)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "24px",
  padding: "20px 30px",
  marginBottom: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxSizing: "border-box",
};

const logTextWrapper = { display: "flex", flexDirection: "column", gap: "4px" };
const logTitleStyle = { color: "#fff", fontSize: "0.95rem", fontWeight: "500" };
const logDateStyle = {
  color: "#555",
  fontSize: "0.75rem",
  textTransform: "uppercase",
};

const statusBadgeStyle = {
  background: "rgba(74, 144, 226, 0.1)",
  color: "#4A90E2",
  padding: "6px 12px",
  borderRadius: "10px",
  fontSize: "0.65rem",
  fontWeight: "800",
  letterSpacing: "1px",
};

const outsideNoticeStyle = {
  textAlign: "left",
  color: "#444",
  marginTop: "20px",
  fontSize: "0.85rem",
  paddingLeft: "10px",
};

const headerGridStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "3rem",
};
const labelStyle = {
  color: "#555",
  margin: 0,
  fontSize: "0.7rem",
  textTransform: "uppercase",
  letterSpacing: "1.5px",
};
const valueTextStyle = { color: "#fff", fontSize: "1.2rem", fontWeight: "700" };
const amountTextStyle = {
  color: "#4A90E2",
  fontSize: "1.5rem",
  fontWeight: "800",
};

const progressContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  position: "relative",
  marginTop: "2rem",
};
const dotStyle = (active) => ({
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  margin: "0 auto",
  background: active ? "#4A90E2" : "#111",
  boxShadow: active ? "0 0 20px rgba(74, 144, 226, 0.4)" : "none",
  border: "3px solid #000",
  zIndex: 3,
});
const stepTextStyle = (active) => ({
  fontSize: "0.65rem",
  marginTop: "12px",
  color: active ? "#fff" : "#444",
  fontWeight: active ? "700" : "400",
});
const trackStyle = {
  position: "absolute",
  top: "6px",
  left: "10%",
  right: "10%",
  height: "2px",
  background: "#111",
  zIndex: 1,
};
const fillStyle = (curr, total) => ({
  position: "absolute",
  top: "6px",
  left: "10%",
  width: `${(curr / (total - 1)) * 80}%`,
  height: "2px",
  background: "#4A90E2",
  zIndex: 1,
  transition: "0.8s cubic-bezier(0.4, 0, 0.2, 1)",
});

const statusDotStyle = (active) => ({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: active ? "#4A90E2" : "#222",
});