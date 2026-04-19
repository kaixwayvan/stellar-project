export default function Card({ children, title }) {
  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px',
      padding: '2rem', marginBottom: '1.5rem'
    }}>
      {title && <h3 style={{ marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '10px' }}>{title}</h3>}
      {children}
    </div>
  );
}