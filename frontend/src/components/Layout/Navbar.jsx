export default function Navbar({ address, setAddress, currentView, setView }) {
  const navItems = [
    { id: 'dashboard', label: 'Home' },
    { id: 'create', label: 'Create Escrow' },
    { id: 'history', label: 'History' }
  ];

  return (
    <nav style={{ 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1rem 2rem', background: '#0a0a0a', borderBottom: '1px solid #222',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <h2 style={{ color: '#4A90E2', margin: 0, fontSize: '1.2rem' }}>🍱 BaonLock</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              style={{
                background: 'none', border: 'none', color: currentView === item.id ? '#4A90E2' : '#888',
                cursor: 'pointer', fontWeight: '500', transition: '0.2s',
                borderBottom: currentView === item.id ? '2px solid #4A90E2' : '2px solid transparent',
                padding: '5px 0'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <button style={{ 
        padding: '8px 16px', borderRadius: '20px', background: '#111', color: '#fff',
        border: '1px solid #333', cursor: 'pointer'
      }}>
        {address ? `${address.slice(0,6)}...${address.slice(-4)}` : "Connect Wallet"}
      </button>
    </nav>
  );
}