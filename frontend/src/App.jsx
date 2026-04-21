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
  const [selectedEscrow, setSelectedEscrow] = useState(null);

  const [escrowList, setEscrowList] = useState([
    { id: "8291", recipientName: "Student A", fullRecipient: "GCW5IIZZYSP7CAACKHBVG35ATGBJ2ZRU55AKNU6IO5AO6HN7WOHO4XZW", amount: 10, status: "Pending" },
    { id: "8288", recipientName: "Student B", amount: 50, status: "Released" },
  ]);

  useEffect(() => {
    if (address) {
      fetchBalance();
    }
  }, [address]);

  const fetchBalance = async () => {
    try {
      const bal = await getBalance(address);
      setBalance(bal);
    } catch (e) {
      console.error("Balance fetch failed", e);
    }
  };

  const handleAddEscrow = (newEscrow) => {
    setEscrowList((prev) => [newEscrow, ...prev]);
    fetchBalance();
    setView("dashboard");
  };

  const handleSelectEscrow = (escrow) => {
    setSelectedEscrow(escrow);
    setView("detail");
  };

  if (!address) {
    return (
      <HeroPage
        onConnect={(addr) => setAddress(addr)}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    );
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
            onSelectEscrow={handleSelectEscrow}
          />
        )}
        {view === "create" && (
          <CreateEscrow onAddEscrow={handleAddEscrow} address={address} />
        )}
        {view === "history" && (
          <HistoryView
            selectedEscrow={selectedEscrow}
            escrowList={escrowList}
          />
        )}
        {view === "detail" && (
          <EscrowDetail
            escrow={selectedEscrow}
            address={address}
            onBack={() => setView("dashboard")}
          />
        )}
      </main>
    </div>
  );
}

export default App;