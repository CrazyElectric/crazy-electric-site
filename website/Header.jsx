// Header.jsx - Crazy Electric website header
// Load with: <script type="text/babel" src="Header.jsx"></script>

const Header = ({ activePage = 'home', logoSrc = "../../assets/logos/logo-google-workspace.png" }) => {
 const [menuOpen, setMenuOpen] = React.useState(false);
 const nav = [
 { label: 'Services', href: '#services' },
 { label: 'About', href: '#about' },
 { label: 'Contact', href: '#contact' },
 ];

 return (
 <header style={{
 background: '#0A0A0A',
 borderBottom: '1px solid rgba(255,255,255,0.08)',
 position: 'sticky', top: 0, zIndex: 100,
 }}>
 <div style={{
 maxWidth: 1200, margin: '0 auto', padding: '0 32px',
 display: 'flex', alignItems: 'center', justifyContent: 'space-between',
 height: 72,
 }}>
 {/* Logo */}
 <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
 <img src={logoSrc} alt="Crazy Electric" style={{ height: 36 }} />
 </a>

 {/* Desktop Nav */}
 <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
 {nav.map(item => (
 <a key={item.label} href={item.href}
 style={{
 fontFamily: "'Barlow', sans-serif",
 fontSize: 13, fontWeight: 700,
 letterSpacing: '0.12em', textTransform: 'uppercase',
 color: '#ccc', textDecoration: 'none',
 transition: 'color 0.15s',
 }}
 onMouseEnter={e => e.target.style.color = '#1AD8C0'}
 onMouseLeave={e => e.target.style.color = '#ccc'}
 >{item.label}</a>
 ))}
 <a href="tel:4809793353" style={{
 fontFamily: "'Barlow', sans-serif",
 background: '#1AD8C0', color: '#0A0A0A',
 fontWeight: 700, fontSize: 13, letterSpacing: '0.08em',
 padding: '10px 20px', textDecoration: 'none',
 borderRadius: 2, transition: 'background 0.15s',
 }}
 onMouseEnter={e => e.target.style.background = '#0FA898'}
 onMouseLeave={e => e.target.style.background = '#1AD8C0'}
 >(480) 979-3353</a>
 </nav>
 </div>
 </header>
 );
};

Object.assign(window, { Header });
