import Card from '../Layout/Card';

export default function HistoryView({ selectedEscrow }) {
  // BaonLock Stages
  const stages = ['Created', 'Confirmed', 'Expired', 'Released'];
  
  // If no escrow is selected, show the "New User" Activity Log
  if (!selectedEscrow) {
    return (
      <div>
        <h3>Activity Log</h3>
        <Card>
          <div style={{ borderLeft: '2px solid #4A90E2', paddingLeft: '1.5rem', position: 'relative' }}>
            <div style={logItemStyle}>
              <strong style={{ color: '#fff', display: 'block' }}>Guardian Profile Active</strong>
              <small style={{ color: '#888' }}>{new Date().toLocaleString()}</small>
              <p style={{ color: '#4A90E2', fontSize: '0.7rem', margin: '5px 0' }}>USER REGISTERED</p>
            </div>
            
            <div style={{ ...logItemStyle, opacity: 0.5 }}>
              <strong style={{ display: 'block' }}>Wallet Connected</strong>
              <small>{new Date().toLocaleTimeString()}</small>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: '#444', marginTop: '2rem', fontSize: '0.9rem' }}>
            No active escrows selected. Create one to see the timeline.
          </p>
        </Card>
      </div>
    );
  }

  // If an escrow is selected, show the Transaction Detail & Timeline
  const currentStatus = selectedEscrow.status; // e.g., 'Confirmed'
  const currentIndex = stages.indexOf(currentStatus);

  return (
    <div>
      <h3>Transaction Detail</h3>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <p style={{ color: '#888', margin: 0, fontSize: '0.8rem' }}>Reference ID</p>
            <strong>{selectedEscrow.id}</strong>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: '#888', margin: 0, fontSize: '0.8rem' }}>Amount</p>
            <strong style={{ color: '#4A90E2' }}>{selectedEscrow.amount} XLM</strong>
          </div>
        </div>

        {/* DYNAMIC TIMELINE */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', position: 'relative' }}>
          {stages.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            return (
              <div key={step} style={{ textAlign: 'center', zIndex: 2, flex: 1 }}>
                <div style={{ 
                  width: '16px', height: '16px', borderRadius: '50%', margin: '0 auto',
                  background: isCompleted ? '#4A90E2' : '#222', 
                  boxShadow: isCompleted ? '0 0 10px #4A90E2' : 'none',
                  border: '4px solid #000', transition: '0.3s'
                }} />
                <p style={{ fontSize: '0.65rem', marginTop: '8px', color: isCompleted ? '#fff' : '#444', fontWeight: isCompleted ? 'bold' : 'normal' }}>
                  {step.toUpperCase()}
                </p>
              </div>
            );
          })}
          {/* Progress Line Background */}
          <div style={{ position: 'absolute', top: '10px', left: '12%', right: '12%', height: '2px', background: '#222', zIndex: 1 }} />
          {/* Active Progress Line */}
          <div style={{ 
            position: 'absolute', top: '10px', left: '12%', 
            width: `${(currentIndex / (stages.length - 1)) * 76}%`, 
            height: '2px', background: '#4A90E2', zIndex: 1, transition: '0.5s' 
          }} />
        </div>
      </Card>

      <h3 style={{ marginTop: '3rem' }}>Contract Logs</h3>
      <Card>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
          <li style={listLogStyle}>
            <span style={{ color: '#4A90E2' }}>•</span> [Contract Initialized] {selectedEscrow.amount} XLM locked for {selectedEscrow.recipientName}
          </li>
          {currentIndex >= 1 && (
            <li style={listLogStyle}>
              <span style={{ color: '#4A90E2' }}>•</span> [Confirmed] Transaction verified on Soroban Testnet
            </li>
          )}
          <li style={{ color: '#444' }}>• Awaiting further contract state changes...</li>
        </ul>
      </Card>
    </div>
  );
}

const logItemStyle = { marginBottom: '1.5rem', position: 'relative' };
const listLogStyle = { marginBottom: '12px', color: '#ccc', borderBottom: '1px solid #111', paddingBottom: '8px' };