import Card from '../Layout/Card';

export default function DisputePage({ escrow, onBack }) {
  const reasons = ["Goods Not Received", "Items Damaged", "Quality Issues", "Other"];

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>← Cancel</button>
      <h2 style={{ color: '#e53e3e' }}>Dispute Center</h2>
      
      <Card>
        <div style={{ background: '#1a1111', padding: '1rem', borderRadius: '8px', border: '1px solid #3b1a1a', marginBottom: '2rem' }}>
          <strong style={{ display: 'block', color: '#ff8a8a' }}>Escrow Compliance</strong>
          <p style={{ fontSize: '0.85rem', color: '#cc9999', margin: '5px 0' }}>
            The anchor/compliance officer will review the case within 48 hours. Funds will remain locked in the secure vault until resolution.
          </p>
        </div>

        <h4>01 SELECT DISPUTE REASON</h4>
        {reasons.map(r => (
          <label key={r} style={{ display: 'block', padding: '12px', background: '#0a0a0a', border: '1px solid #222', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer' }}>
            <input type="radio" name="reason" style={{ marginRight: '10px' }} /> {r}
          </label>
        ))}

        <h4 style={{ marginTop: '2rem' }}>02 ADDITIONAL DETAILS</h4>
        <textarea placeholder="Explain the issue..." style={{ width: '100%', background: '#0a0a0a', color: '#fff', border: '1px solid #222', padding: '1rem', borderRadius: '8px', height: '100px' }} />

        <h4 style={{ marginTop: '2rem' }}>03 UPLOAD EVIDENCE</h4>
        <div style={{ border: '2px dashed #333', padding: '2rem', textAlign: 'center', borderRadius: '12px' }}>
          <p style={{ margin: 0 }}>☁️ Drag files here or click to upload</p>
          <small style={{ color: '#555' }}>PNG, JPG, PDF (Max 10MB)</small>
        </div>

        <button style={{ width: '100%', marginTop: '2rem', padding: '1.2rem', background: '#e53e3e', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          FREEZE FUNDS & NOTIFY ANCHOR
        </button>
      </Card>
    </div>
  );
}