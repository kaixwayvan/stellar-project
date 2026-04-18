import { useState, useEffect } from 'react'
import { connectWallet, depositBaon } from './stellar'

function App() {
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false) // Track connection state
  const [form, setForm] = useState({ student: '', amount: '', date: '' })

  const handleConnect = async () => {
    setStatus("⌛ Detecting Freighter...");
    setLoading(true);
    
    try {
      const addr = await connectWallet();
      if (addr) {
        setAddress(addr);
        setStatus("✅ Wallet Connected!");
      } else {
        setStatus("❌ Connection cancelled or timed out.");
      }
    } catch (err) {
      console.error("Critical Connection Error:", err);
      // Give the user a hint about the browser settings we discussed
      setStatus("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDeposit = async (e) => {
    e.preventDefault();
    setStatus('⌛ Sending to Stellar...');
    try {
      const unixTime = Math.floor(new Date(form.date).getTime() / 1000);
      
      // Pass the 'address' (parent) as the sender to match your contract logic
      await depositBaon(address, form.student, form.amount, unixTime);
      
      setStatus('✅ Success! Funds Locked.');
    } catch (err) {
      setStatus('❌ Error: ' + err.message);
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', textAlign: 'left', fontFamily: 'sans-serif' }}>
      <h1>🍱 BaonLock</h1>
      <p>Secure Student Allowances</p>

      {address ? (
        <div style={{ padding: '10px', backgroundColor: '#e6fffa', borderRadius: '8px' }}>
            <p style={{ color: '#2c7a7b', margin: 0 }}>
                <strong>Connected:</strong> {address.slice(0,6)}...{address.slice(-6)}
            </p>
        </div>
      ) : (
        <button 
            onClick={handleConnect} 
            disabled={loading}
            style={{ width: '100%', padding: '10px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}

      <hr style={{ margin: '1.5rem 0', opacity: 0.2 }} />

      <form onSubmit={handleDeposit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>Student Wallet</label>
        <input type="text" placeholder="G..." 
          onChange={e => setForm({...form, student: e.target.value})} required />
        
        <label>Total Allowance (XLM)</label>
        <input type="number" placeholder="100" 
          onChange={e => setForm({...form, amount: e.target.value})} required />
        
        <label>Unlock Date & Time</label>
        <input type="datetime-local" 
          onChange={e => setForm({...form, date: e.target.value})} required />

        <button 
            type="submit" 
            disabled={!address}
            style={{ 
                padding: '12px', 
                backgroundColor: address ? '#4A90E2' : '#ccc', 
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: address ? 'pointer' : 'not-allowed'
            }}
        >
          Lock Allowance
        </button>
      </form>

      {status && (
        <div style={{ 
            marginTop: '1rem', 
            padding: '10px', 
            fontSize: '0.9rem',
            borderLeft: '4px solid #333',
            backgroundColor: '#f9f9f9'
        }}>
            {status}
        </div>
      )}
    </div>
  )
}

export default App