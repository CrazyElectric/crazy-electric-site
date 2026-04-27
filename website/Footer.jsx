// Footer.jsx - Crazy Electric website footer
// Load with: <script type="text/babel" src="Footer.jsx"></script>

const Footer = ({ logoSrc = "../../assets/logos/logo-google-workspace.png" }) => (
 <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '56px 32px 32px' }}>
 <div style={{ maxWidth: 1200, margin: '0 auto' }}>

 {/* Top row */}
 <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap', marginBottom: 48, justifyContent: 'space-between' }}>

 {/* Logo + tagline */}
 <div style={{ maxWidth: 280 }}>
 <img src={logoSrc} alt="Crazy Electric" style={{ height: 32, marginBottom: 16 }} />
 <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: '#555', lineHeight: 1.7 }}>
 Licensed electrical contractor serving the Phoenix metro area. Clean work. No shortcuts.
 </p>
 <div style={{ marginTop: 16, fontFamily: "'Barlow', sans-serif", fontSize: 11, color: '#444', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
 ROC #342950 · Licensed · Bonded · Insured
 </div>
 </div>

 {/* Services */}
 <div>
 <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1AD8C0', marginBottom: 16 }}>Services</div>
 {['Panel Upgrades', 'EV Charger Installs', 'Lighting Installs', 'Outlets & Wiring', 'Troubleshooting', 'Surge Protection'].map(s => (
 <div key={s} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: '#666', marginBottom: 8, cursor: 'pointer' }}
 onMouseEnter={e => e.target.style.color = '#fff'}
 onMouseLeave={e => e.target.style.color = '#666'}
 >{s}</div>
 ))}
 </div>

 {/* Service areas */}
 <div>
 <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1AD8C0', marginBottom: 16 }}>Service Areas</div>
 {['Phoenix', 'Scottsdale', 'Tempe', 'Mesa', 'Gilbert', 'Chandler'].map(a => (
 <div key={a} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: '#666', marginBottom: 8 }}>{a}</div>
 ))}
 </div>

 {/* Contact */}
 <div>
 <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1AD8C0', marginBottom: 16 }}>Contact</div>
 <a href="tel:4809793353" style={{ display: 'block', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: '#1AD8C0', textDecoration: 'none', marginBottom: 4 }}>
 (480) 979-3353
 </a>
 <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: '#555', marginBottom: 16 }}>Call or Text</div>
 <a href="https://www.CrazyElectricAZ.com" style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: '#555', textDecoration: 'none' }}
 onMouseEnter={e => e.target.style.color = '#1AD8C0'}
 onMouseLeave={e => e.target.style.color = '#555'}
 >www.CrazyElectricAZ.com</a>
 </div>
 </div>

 {/* Bottom bar */}
 <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
 <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: '#444' }}>
 © {new Date().getFullYear()} Crazy Electric LLC. All rights reserved. Phoenix, AZ.
 </div>
 <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: '#444', fontStyle: 'italic' }}>
 Don't Think Crazy, Choose Crazy.
 </div>
 </div>
 </div>
 </footer>
);

Object.assign(window, { Footer });
