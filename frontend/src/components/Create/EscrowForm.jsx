import { useState } from 'react';
import Card from '../Layout/Card';

export default function EscrowForm() {
  const [amt, setAmt] = useState(0);
  const fee = amt * 0.005; // 0.5% fee
  const total = Number(amt) + fee;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3>Initialize New Escrow</h3>
      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label>Recipient Address</label>
          <input type="text" placeholder="G..." style={inputStyle} />
          
          <label>Amount to Lock (USDC)</label>
          <input type="number" onChange={(e) => setAmt(e.target.value)} style={inputStyle} />
          
          <div style={{ background: '#000', padding: '1rem', borderRadius: '8px', border: '1px solid #222' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#888' }}>Protection Fee (0.5%)</span>
              <span>{fee.toFixed(2)} USDC</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem' }}>
              <span>Total to Lock</span>
              <span style={{ color: '#4A90E2' }}>{total.toFixed(2)} USDC</span>
            </div>
          </div>

          <button style={{ 
            padding: '1rem', background: '#4A90E2', color: '#fff', 
            border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
          }}>
            Confirm & Initialize Escrow
          </button>
        </div>
      </Card>
    </div>
  );
}

const inputStyle = { padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px' };