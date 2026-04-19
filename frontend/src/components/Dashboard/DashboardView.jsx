const getActivityLogs = (escrowList) => {
  // If no transactions have been made yet
  if (!escrowList || escrowList.length === 0) {
    return [
      { text: "Guardian Profile Initialized: Parent/Provider", date: "Apr 20, 2026, 1:23 AM", status: "PROTOCOL READY" },
      { text: "Freighter Wallet Linked to BaonLock", date: "Apr 20, 2026, 1:20 AM", status: "SECURED" }
    ];
  }

  // If there is data, show the actual allowance movements
  return escrowList.map(e => ({
    text: `Allowance for ${e.recipientName} - Locked in Vault`,
    date: new Date().toLocaleDateString(),
    status: e.status === "Released" ? "FUNDS CLAIMED" : "LOCKED",
    raw: e // keep the original object for the click handler
  }));
};

import Card from '../Layout/Card';

export default function DashboardView({ balance, address, escrowList, onSelectEscrow, setView }) {
  const logs = getActivityLogs(escrowList);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <Card title="Wallet Balance">
          <h2 style={{ margin: '10px 0' }}>
            {balance ? parseFloat(balance).toLocaleString() : "0.00"} <span style={{fontSize: '0.8rem', color: '#888'}}>XLM</span>
          </h2>
          <a href={`https://stellar.expert/explorer/testnet/account/${address}`} target="_blank" rel="noreferrer" style={{ color: '#4A90E2', fontSize: '0.8rem', textDecoration: 'none' }}>
            View on Stellar Expert ↗
          </a>
        </Card>
        <Card title="Active Escrows">
          <h2 style={{ margin: '10px 0' }}>{String(escrowList?.length || 0).padStart(2, '0')}</h2>
          <span style={{ color: '#48bb78', fontSize: '0.8rem' }}>● All systems healthy</span>
        </Card>
        <Card title="Total Volume">
          <h2 style={{ margin: '10px 0' }}>
            ${escrowList?.reduce((sum, e) => sum + Number(e.amount), 0).toLocaleString()}
          </h2>
          <span style={{ color: '#888', fontSize: '0.8rem' }}>{escrowList?.length || 0} transactions</span>
        </Card>
      </div>

      <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Recent Activity</h3>
        <button onClick={() => setView('history')} style={{ background: 'none', border: 'none', color: '#4A90E2', cursor: 'pointer' }}>View All</button>
      </div>
      
      <Card>
        {logs.map((log, i) => (
          <div 
            key={i} 
            onClick={() => log.raw && onSelectEscrow(log.raw)}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '10px 0', 
              borderBottom: i !== logs.length - 1 ? '1px solid #222' : 'none',
              cursor: log.raw ? 'pointer' : 'default'
            }}
          >
            <div>
              <span style={{ display: 'block' }}>{log.text}</span>
              <small style={{ color: '#555' }}>{log.date}</small>
            </div>
            <span style={{ color: log.status === 'LOCKED' ? '#ed8936' : '#4A90E2', fontWeight: 'bold', fontSize: '0.8rem' }}>
              {log.status}
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
}