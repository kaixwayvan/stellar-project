import { useState } from 'react';
import Card from '../Layout/Card';
import DisputePage from './DisputePage';

export default function EscrowDetail({ escrow, onBack }) {
  const [mode, setMode] = useState('detail'); // detail | dispute

  if (mode === 'dispute') return <DisputePage escrow={escrow} onBack={() => setMode('detail')} />;

  return (
    <div>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#4A90E2', cursor: 'pointer', marginBottom: '1rem' }}>
        ← Back to Dashboard
      </button>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        <div>
          <Card title="Contract Status">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div>
                <p style={{ color: '#888', margin: 0 }}>Locked Volume</p>
                <h2 style={{ margin: 0 }}>{escrow?.amount || "10.00"} USDC</h2>
              </div>
              <button style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '8px' }}>
                ⏳ Refresh
              </button>
            </div>

            <div style={{ background: '#050505', padding: '1.5rem', borderRadius: '12px', border: '1px solid #111' }}>
              <p style={{ color: '#888', margin: 0 }}>Auto-Release Countdown</p>
              <h2 style={{ color: '#4A90E2', margin: '10px 0' }}>22h 59m 09s</h2>
              <small style={{ color: '#444' }}>April 21, 2026, 12:10 AM</small>
            </div>
          </Card>
        </div>

        <div>
          <Card title="Guardian Controls">
            <button 
              onClick={() => alert("Opening Freighter...")} 
              style={{ width: '100%', padding: '1rem', background: '#4A90E2', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', marginBottom: '1rem', cursor: 'pointer' }}
            >
              Confirm Release
            </button>
            
            <button 
              onClick={() => setMode('dispute')}
              style={{ width: '100%', padding: '1rem', background: 'transparent', color: '#e53e3e', border: '1px solid #e53e3e', borderRadius: '8px', cursor: 'pointer' }}
            >
              Raise Dispute
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}