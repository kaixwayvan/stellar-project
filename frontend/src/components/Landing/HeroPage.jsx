import React, { useState } from "react";
import { connectWallet } from "../../stellar/stellar";

export default function HeroPage({ onConnect, isLoading, setIsLoading }) {
  const [isHovered, setIsHovered] = useState(false);
  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const addr = await connectWallet();
      onConnect(addr);
    } catch (err) {
      alert("Please install Freighter or allow connection.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={blueBlurStyle}></div>
      <div style={purpleBlurStyle}></div>

      <nav style={{ ...contentWrapper, ...navStyle }}>
        <div style={logoStyle}>
          Baon<span style={{ fontWeight: "200", color: "#4A90E2" }}>Luck</span>
        </div>
        <div
          style={{
            ...navLinksStyle,
            ...(isHovered ? navLinksHoverStyle : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span style={statusDotStyle}></span>
          <small style={{ color: "#86868B", fontWeight: "500" }}>
            Stellar Testnet Live
          </small>
        </div>
      </nav>

      {/* Main Glass Hero */}
      <section style={glassHeroStyle}>
        <div style={chipStyle}>Protocol v1.0</div>
        <h1 style={titleStyle}>
          Finance. <br />
          <span style={gradientText}>Simplified for Students.</span>
        </h1>
        <p style={descriptionStyle}>
          Automate allowances on the Stellar Network. Securely lock funds with
          smart time-release protocols designed for the next generation.
        </p>

        <button
          onClick={handleConnect}
          style={isLoading ? { ...buttonStyle, opacity: 0.6 } : buttonStyle}
          disabled={isLoading}
        >
          {isLoading ? "Authenticating..." : "Connect Freighter"}
        </button>
      </section>

      {/* Steps Section */}
      <div style={gridStyle}>
        {[
          {
            num: "01",
            title: "The Wallet",
            desc: "Install Freighter. Switch to Testnet.",
          },
          {
            num: "02",
            title: "The Assets",
            desc: "Hold XLM for Soroban smart contract fees.",
          },
          {
            num: "03",
            title: "The Flow",
            desc: "Set lock dates and release funds instantly.",
          },
        ].map((step, i) => (
          <div key={i} style={stepCardStyle}>
            <span style={stepNumberStyle}>{step.num}</span>
            <h3 style={stepTitleStyle}>{step.title}</h3>
            <p style={stepTextStyle}>{step.desc}</p>
          </div>
        ))}
      </div>

      <footer style={footerStyle}>
        <div style={{ marginBottom: "12px" }}>
          <a
            href="https://github.com/kaixwayvan"
            target="_blank"
            rel="noopener noreferrer"
            style={githubLinkStyle}
          >
            github.com/kaixwayvan
          </a>
        </div>
        <p style={{ margin: 0 }}>
          Built for the Stellar Hackathon • Soroban Powered
        </p>
      </footer>
    </div>
  );
}

// --- Style Variables ---

const containerStyle = {
  backgroundColor: "#000",
  minHeight: "100vh",
  fontFamily: '"Inter", -apple-system, sans-serif',
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px 24px 100px",
  overflowX: "hidden",
  position: "relative",
};

const navStyle = {
  width: "100%",
  maxWidth: "1100px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "40px",
  zIndex: 2,
};

const contentWrapper = {
  width: "100%",
  maxWidth: "1100px",
  padding: "0 50px",
  boxSizing: "border-box",
};

const logoStyle = {
  fontSize: "22px",
  fontWeight: "800",
  letterSpacing: "-1px",
  cursor: "default",
};

const navLinksStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'rgba(255,255,255,0.05)',
  padding: '6px 14px',
  borderRadius: '100px',
  border: '1px solid rgba(255,255,255,0.08)',
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  backdropFilter: 'blur(12px)',
};

const navLinksHoverStyle = {
  transform: 'translateY(-2px) scale(1.02)',
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)',
  boxShadow: '0 8px 30px rgba(74, 144, 226, 0.15)',
};

const statusDotStyle = {
  width: "6px",
  height: "6px",
  backgroundColor: "#4A90E2",
  borderRadius: "50%",
  boxShadow: "0 0 8px #4A90E2",
};

const blueBlurStyle = {
  position: "absolute",
  width: "600px",
  height: "400px",
  top: "-100px",
  left: "-100px",
  background: "rgba(74, 144, 226, 0.12)",
  filter: "blur(120px)",
  zIndex: 0,
};

const purpleBlurStyle = {
  position: "absolute",
  width: "500px",
  height: "500px",
  bottom: "10%",
  right: "-100px",
  background: "rgba(168, 85, 247, 0.08)",
  filter: "blur(120px)",
  zIndex: 0,
};

const glassHeroStyle = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
  backdropFilter: "blur(30px)",
  WebkitBackdropFilter: "blur(30px)",
  borderRadius: "40px",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "80px 40px",
  textAlign: "center",
  maxWidth: "900px",
  width: "100%",
  zIndex: 1,
  boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
};

const chipStyle = {
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "1.2px",
  textTransform: "uppercase",
  color: "#4A90E2",
  marginBottom: "28px",
  opacity: 0.9,
};

const titleStyle = {
  fontSize: "clamp(2.5rem, 8vw, 4.2rem)",
  fontWeight: "800",
  lineHeight: "1.05",
  letterSpacing: "-0.05em",
  margin: "0 0 24px",
};

const gradientText = {
  background: "linear-gradient(to bottom, #fff 40%, #777 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const descriptionStyle = {
  fontSize: "1.15rem",
  color: "#86868B",
  maxWidth: "540px",
  margin: "0 auto 48px",
  lineHeight: "1.5",
};

const buttonStyle = {
  backgroundColor: "#fff",
  color: "#000",
  padding: "16px 42px",
  borderRadius: "100px",
  fontSize: "16px",
  fontWeight: "600",
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  maxWidth: "1100px",
  width: "100%",
  marginTop: "40px",
  zIndex: 1,
};

const stepCardStyle = {
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.05)",
  padding: "40px 32px",
  borderRadius: "28px",
  backdropFilter: "blur(10px)",
  transition: "border 0.3s ease",
};

const stepNumberStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: "700",
  color: "#4A90E2",
  marginBottom: "20px",
};

const stepTitleStyle = {
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "12px",
  letterSpacing: "-0.02em",
};

const stepTextStyle = {
  color: "#86868B",
  fontSize: "15px",
  lineHeight: "1.5",
  margin: 0,
};

const footerStyle = {
  marginTop: "120px",
  textAlign: "center",
  color: "#444",
  fontSize: "12px",
  letterSpacing: "0.5px",
  zIndex: 1,
};

const githubLinkStyle = {
  color: "#86868B",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
  transition: "color 0.2s ease",
  borderBottom: "1px solid #222",
};
