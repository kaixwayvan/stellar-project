import React from "react";

export default function Navbar({ address, currentView, setView }) {
  const navItems = [
    { id: "dashboard", label: "Home" },
    { id: "create", label: "Create" },
    { id: "history", label: "History" },
  ];

  return (
    <div style={gradientOverlayStyle}>
      <div style={navWrapperStyle}>
        <nav style={navBarStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            <div style={logoStyle}>
              Baon
              <span style={{ fontWeight: "200", color: "#4A90E2" }}>Lock</span>
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  style={navItemStyle(currentView === item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <button style={walletButtonStyle}>
            <div style={statusIndicatorStyle} />
            {address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : "Connect"}
          </button>
        </nav>
      </div>
    </div>
  );
}

const gradientOverlayStyle = {
  position: "sticky",
  top: 0,
  zIndex: 1000,
  width: "100%",
  /* The gradient stays fixed at the very top */
  background:
    "linear-gradient(to bottom, #050505 0%, rgba(5,5,5,0.8) 70%, transparent 100%)",
  pointerEvents: "none", // Allows clicks to pass through to the dashboard below
};

const navWrapperStyle = {
  width: "100%",
  maxWidth: "1100px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  padding: "30px 40px 20px 40px",
};

const navBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 40px",
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "100px",
  border: "1px solid rgba(255,255,255,0.08)",
  width: "100%",
  maxWidth: "1100px",
  pointerEvents: "auto", // Re-enables clicks for buttons inside the nav
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  boxSizing: "border-box",
};

const logoStyle = {
  color: "#fff",
  margin: 0,
  fontSize: "1rem",
  fontWeight: "800",
  letterSpacing: "-0.5px",
};

const navItemStyle = (isActive) => ({
  background: "none",
  border: "none",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "0.75rem",
  color: isActive ? "#4A90E2" : "rgba(255,255,255,0.4)",
  textTransform: "uppercase",
  transition: "0.2s",
});

const walletButtonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 14px",
  borderRadius: "100px",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.1)",
  cursor: "pointer",
  fontSize: "0.75rem",
};

const statusIndicatorStyle = {
  width: "6px",
  height: "6px",
  backgroundColor: "#48bb78",
  borderRadius: "50%",
  boxShadow: "0 0 8px #48bb78",
};
