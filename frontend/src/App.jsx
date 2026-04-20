import { useState, useEffect } from "react";
import Navbar from "./components/Layout/Navbar";
import DashboardView from "./components/Dashboard/DashboardView";
import CreateEscrow from "./components/Create/EscrowForm";
import EscrowDetail from "./components/Details/EscrowDetail";
import HistoryView from "./components/History/HistoryView";
import HeroPage from "./components/Landing/HeroPage";
import { getBalance } from "./stellar/stellar";

function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0.00");
  const [view, setView] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);

  const [escrowList, setEscrowList] = useState([
    { id: "8291", recipientName: "Account 2", amount: 10, status: "Pending" },
    { id: "8288", recipientName: "Student B", amount: 50, status: "Released" },
  ]);

  useEffect(() => {
    if (address) {
      getBalance(address).then((bal) => setBalance(bal));
    }
  }, [address]);

  if (!address) {
    return (
      <HeroPage
        onConnect={(addr) => setAddress(addr)}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    );
  }

  const handleConnect = async (addr) => {
    setAddress(addr);
    try {
      const bal = await getBalance(addr);
      setBalance(bal);
    } catch (e) {
      console.error("Balance fetch failed", e);
    }
  };

  if (!address) {
    return <HeroPage onConnect={handleConnect} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <Navbar address={address} currentView={view} setView={setView} />

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        {view === "dashboard" && (
          <DashboardView
            balance={balance}
            address={address}
            escrowList={escrowList}
            setView={setView}
          />
        )}
        {view === "create" && <CreateEscrow />}
        {view === "history" && <HistoryView />}
        {view === "detail" && (
          <EscrowDetail 
            escrow={selectedEscrow} 
            onBack={() => setView("dashboard")} 
          />
        )}
      </main>
    </div>
  );
}

export default App;