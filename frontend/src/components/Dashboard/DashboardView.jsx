import React from "react";

const getActivityLogs = (escrowList) => {
  const baseLogs = [
    {
      text: "Guardian Profile Active",
      date: "4/20/2026, 3:56:21 PM",
      status: "USER REGISTERED",
    },
    {
      text: "Wallet Connected",
      date: "4/20/2026, 3:56:21 PM",
      status: "SECURED",
    },
  ];

  if (!escrowList || escrowList.length === 0) {
    return baseLogs;
  }

  const dynamicLogs = escrowList.map((e) => ({
    text: `Allowance for ${e.recipientName}`,
    // Formats date to: M/D/YYYY, H:MM:SS AM/PM
    date: new Date().toLocaleString(), 
    status: e.status === "Released" ? "FUNDS CLAIMED" : "ESCROW INITIALIZED",
    raw: e,
  }));

  return [...dynamicLogs, ...baseLogs];
};

export default function DashboardView({
  balance,
  address,
  escrowList,
  onSelectEscrow,
  setView,
}) {
  const logs = getActivityLogs(escrowList);

  const metrics = [
    {
      title: "Wallet Balance",
      val: balance ? parseFloat(balance).toLocaleString() : "0.00",
      unit: "XLM",
      linkText: "Stellar Explorer ↗",
      linkAction: () =>
        window.open(
          `https://stellar.expert/explorer/testnet/account/${address}`,
          "_blank",
        ),
    },
    {
      title: "Active Escrows",
      val: String(escrowList?.length || 0).padStart(2, "0"),
      unit: "contracts",
      linkText: "Manage All →",
      linkAction: () => setView("history"),
    },
    {
      title: "Total Volume",
      val: `$${escrowList?.reduce((sum, e) => sum + Number(e.amount), 0).toLocaleString()}`,
      unit: "locked",
      linkText: "Create New ⊕",
      linkAction: () => setView("create"),
    },
  ];

  return (
    <div style={containerStyle}>
      <div style={blobOneStyle} />
      <div style={blobTwoStyle} />

      <header style={headerStyle}>
        <h1 style={welcomeTextStyle}>Welcome!</h1>
        <div style={idBadgeStyle}>
          <span style={statusPulseStyle} />
          <span style={addressValueStyle}>
            {address
              ? `${address.slice(0, 8)}...${address.slice(-4)}`
              : "CONNECTING..."}
          </span>
        </div>
      </header>

      <div style={gridStyle}>
        {metrics.map((item, i) => (
          <div
            key={i}
            style={glassCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
            }}
          >
            <p style={cardLabelStyle}>{item.title}</p>
            <div
              style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "8px" }}
            >
              <h2 style={valueStyle}>{item.val}</h2>
              <span style={unitStyle}>{item.unit}</span>
            </div>
            <button onClick={item.linkAction} style={cardLinkButtonStyle}>
              {item.linkText}
            </button>
          </div>
        ))}
      </div>

      <section style={activitySectionStyle}>
        <h3 style={sectionTitleStyle}>RECENT ACTIVITY</h3>
        <div style={dividerStyle} />
        
        <div style={logContainerStyle}>
          {logs.map((log, i) => (
            <div
              key={i}
              onClick={() => log.raw && onSelectEscrow(log.raw)}
              style={logItemStyle}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <div style={statusDotStyle(log.status)} />
                <div>
                  <div style={logTextStyle}>{log.text}</div>
                  <div style={logMetaStyle}>{log.date}</div>
                </div>
              </div>
              <div style={statusTagStyle(log.status)}>{log.status}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setView("history")} style={auditButtonStyle}>
          VIEW FULL AUDIT LOG ↘
        </button>
      </section>
    </div>
  );
}

// --- STYLES ---

const containerStyle = {
  backgroundColor: "#050505",
  color: "#fff",
  padding: "60px 40px",
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  borderRadius: "35px",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxSizing: "border-box"
};

const headerStyle = { 
  width: "100%",
  maxWidth: "1100px",
  marginBottom: "4rem", 
  zIndex: 1, 
  position: "relative" 
};

const welcomeTextStyle = {
  fontSize: "5rem",
  fontWeight: "900",
  letterSpacing: "-3px",
  margin: "0 0 10px 0",
  lineHeight: '1',
  background:
    "linear-gradient(to bottom, #FFFFFF 0%, #A1A1A6 50%, #FFFFFF 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textAlign: "left",
};

const idBadgeStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "rgba(255,255,255,0.05)",
  padding: "8px 16px",
  borderRadius: "100px",
  width: "fit-content",
};

const addressValueStyle = { fontSize: "0.85rem", color: "#888" };

const statusPulseStyle = {
  width: "8px",
  height: "8px",
  backgroundColor: "#48bb78",
  borderRadius: "50%",
  boxShadow: "0 0 12px #48bb78",
};

const gridStyle = {
  display: "flex",
  gap: "20px",
  width: "100%",
  maxWidth: "1100px",
  marginBottom: "2rem",
  zIndex: 1,
  position: "relative",
};

const glassCardStyle = {
  background: "rgba(255, 255, 255, 0.02)",
  backdropFilter: "blur(40px)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "32px",
  padding: "20px 0 40px 0",
  flex: 1,
  transition: "all 0.3s ease",
};

const cardLabelStyle = {
  fontSize: "0.7rem",
  fontWeight: "700",
  color: "#888",
  textTransform: "uppercase",
  letterSpacing: "1.5px",
};

const valueStyle = {
  fontSize: "2rem",
  fontWeight: "900",
  margin: 0,
  lineHeight: '1',
  background: "linear-gradient(180deg, #FFFFFF 0%, #D1D1D6 45%, #FFFFFF 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
  backgroundSize: "100% 100%",
  letterSpacing: "-1px"
};

const unitStyle = { fontSize: "0.9rem", color: "#555", fontWeight: "500" };

const cardLinkButtonStyle = {
  background: "rgba(74, 144, 226, 0.1)",
  border: "none",
  color: "#4A90E2",
  padding: "8px 16px",
  borderRadius: "100px",
  fontSize: "0.7rem",
  fontWeight: "700",
  cursor: "pointer",
  marginTop: "20px",
  textTransform: "uppercase",
};

const activitySectionStyle = {
  width: "100%",
  maxWidth: "1100px",
  zIndex: 1,
  position: "relative",
  textAlign: "left",
};

const sectionTitleStyle = {
  fontSize: "1.7rem",
  fontWeight: "200",
  letterSpacing: "2.5px",
  marginBottom: "10px",
};

const dividerStyle = {
  width: "80px",
  height: "2px",
  background: "#4A90E2",
  borderRadius: "10px",
  marginBottom: "30px",
};

const logContainerStyle = {
  width: '100%',
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const logItemStyle = {
  width: '100%',
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.02)",
  cursor: "pointer",
  boxSizing: 'border-box'
};

const statusDotStyle = (status) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: status === "SECURED" || status === "USER REGISTERED" ? "#48bb78" : "#4A90E2",
});

const logTextStyle = { fontSize: "1rem", fontWeight: "500" };

const logMetaStyle = {
  fontSize: "0.7rem",
  color: "#555",
  marginTop: "4px",
  textTransform: "uppercase",
};

const statusTagStyle = (status) => ({
  fontSize: "0.7rem",
  fontWeight: "700",
  padding: "6px 12px",
  borderRadius: "8px",
  background: "rgba(255, 255, 255, 0.05)",
  color: status === "USER REGISTERED" || status === "SECURED" ? "#48bb78" : "#4A90E2",
});

const auditButtonStyle = {
  background: "none",
  border: "1px solid #333",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "14px",
  fontSize: "0.7rem",
  fontWeight: "700",
  cursor: "pointer",
  marginTop: "30px",
  textTransform: "uppercase",
};

const blobOneStyle = {
  position: "absolute",
  width: "600px",
  height: "600px",
  background:
    "radial-gradient(circle, rgba(74,144,226,0.05) 20%, transparent 80%)",
  top: "-200px",
  right: "-100px",
  zIndex: 0,
};

const blobTwoStyle = {
  position: "absolute",
  width: "600px",
  height: "600px",
  background:
    "radial-gradient(circle, rgba(168,85,247,0.05) 20%, transparent 70%)",
  bottom: "-200px",
  left: "-100px",
  zIndex: 0,
};