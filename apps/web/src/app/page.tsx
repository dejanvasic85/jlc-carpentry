import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>JLC Carpentry & Building Services - Design Options</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Choose from three different design concepts for the website:
      </p>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <Link 
          href="/design1" 
          style={{ 
            padding: '1rem 2rem', 
            backgroundColor: '#007bff', 
            color: 'white', 
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'block'
          }}
        >
          Design 1 - Modern Minimalist
        </Link>
        
        <Link 
          href="/design2" 
          style={{ 
            padding: '1rem 2rem', 
            backgroundColor: '#28a745', 
            color: 'white', 
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'block'
          }}
        >
          Design 2 - Professional Corporate
        </Link>
        
        <Link 
          href="/design3" 
          style={{ 
            padding: '1rem 2rem', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'block'
          }}
        >
          Design 3 - Bold Visual
        </Link>
      </div>
    </div>
  );
}
