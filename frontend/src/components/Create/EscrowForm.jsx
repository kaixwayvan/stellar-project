import React, { useState } from "react";
// Assuming you have freighter integration in your stellar file
// import { signTransaction } from "@stellar/freighter-api"; 

export default function EscrowForm({ onAddEscrow, address }) {
  const [recipient, setRecipient] = useState("");
  const [amt, setAmt] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const fee = amt ? Number(amt) * 0.005 : 0;
  const total = amt ? Number(amt) + fee : 0;

  const handleInitialize = async () => {
    if (!recipient || !amt || !releaseDate) {
      alert("Missing parameters: Ensure recipient, amount, and release date are set.");
      return;
    }

    if (recipient.length < 56 || !recipient.startsWith("G")) {
      alert("Please enter a valid Stellar Address (starting with G).");
      return;
    }

    setIsProcessing(true);

    try {
      // In a real Soroban setup, you would:
      // 1. Prepare the transaction for the smart contract
      // 2. Request signature from Freighter
      // 3. Submit to the network
      
      console.log("Contacting Freighter for address:", address);
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newEscrow = {
        id: Math.floor(Math.random() * 10000).toString(),
        recipientName: recipient.slice(0, 6) + "..." + recipient.slice(-4),
        fullRecipient: recipient,
        amount: Number(amt),
        fee: fee,
        total: total,
        status: "Confirmed", 
        timestamp: new Date().toLocaleString(),
        releaseDate: releaseDate,
      };

      onAddEscrow(newEscrow);
      alert(`Protocol Initialized: ${amt} USDC secured for ${newEscrow.recipientName}`);
      
    } catch (error) {
      console.error("Freighter transaction failed", error);
      alert("Transaction declined or failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={wideTitleStyle}>INITIALIZE PROTOCOL</h1>

      <div style={glassCardStyle}>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div style={inputGroupStyle}>
            <label style={labelStyle}>RECIPIENT PUBLIC KEY</label>
            <input
              type="text"
              placeholder="G..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>AMOUNT TO LOCK (USDC)</label>
            <input
              type="number"
              placeholder="0.00"
              value={amt}
              onChange={(e) => setAmt(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>FUNDS RELEASE DATE</label>
            <input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              style={{ ...inputStyle, colorScheme: "dark" }}
            />
          </div>

          <div style={summaryBoxStyle}>
            <div style={rowStyle}>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>
                Protection Fee (0.5%)
              </span>
              <span style={helveticaStyle}>{fee.toFixed(2)} USDC</span>
            </div>
            <div style={dividerStyle} />
            <div style={rowStyle}>
              <span style={{ fontWeight: "700" }}>TOTAL TO LOCK</span>
              <span style={totalValueStyle}>{total.toFixed(2)} USDC</span>
            </div>
          </div>

          <button 
            onClick={handleInitialize} 
            disabled={isProcessing}
            style={{
              ...actionButtonStyle,
              opacity: isProcessing ? 0.6 : 1,
              cursor: isProcessing ? "not-allowed" : "pointer"
            }}
          >
            {isProcessing ? "SIGNING WITH FREIGHTER..." : "CONFIRM & INITIALIZE ESCROW ↘"}
          </button>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  maxWidth: "700px",
  margin: "60px auto",
  padding: "0 20px",
  color: "#fff",
};

const wideTitleStyle = {
  fontFamily: '"Syne", sans-serif',
  fontSize: "3rem",
  fontWeight: "900",
  letterSpacing: "-1px",
  marginBottom: "2rem",
  textTransform: "uppercase",
};

const glassCardStyle = {
  background: "rgba(255, 255, 255, 0.02)",
  backdropFilter: "blur(40px)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "24px",
  padding: "40px",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle = {
  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  fontSize: "0.7rem",
  fontWeight: "700",
  color: "#4A90E2",
  letterSpacing: "2px",
};

const inputStyle = {
  padding: "16px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  borderRadius: "8px",
  fontSize: "1rem",
  fontFamily: '"Helvetica Neue", sans-serif',
  outline: "none",
};

const summaryBoxStyle = {
  background: "rgba(0,0,0,0.3)",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.05)",
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontFamily: '"Helvetica Neue", sans-serif',
  fontSize: "0.9rem",
};

const dividerStyle = {
  height: "1px",
  background: "rgba(255,255,255,0.1)",
  margin: "12px 0",
};

const totalValueStyle = {
  color: "#4A90E2",
  fontWeight: "800",
  fontSize: "1.2rem",
};

const actionButtonStyle = {
  padding: "20px",
  background: "#4A90E2",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontWeight: "800",
  cursor: "pointer",
  fontSize: "0.9rem",
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginTop: "10px",
  transition: "transform 0.2s ease",
};

const helveticaStyle = { fontFamily: '"Helvetica Neue", sans-serif' };